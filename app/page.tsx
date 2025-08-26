"use client";

import { useState, useEffect } from "react";
import { StyleInspector } from "@/components/editor/StyleInspector";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Preview } from "@/components/editor/Preview";
import { ViewToggle } from "@/components/editor/ViewToggle";

const initialCode = `
import React from 'react';

export default function MyComponent() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        Build Visually
      </h1>
      <p className="text-lg text-gray-500 max-w-md text-center mb-8">
        Click any element to select it. Use the inspector on the left to modify its style in real-time.
      </p>
      <button className="px-8 py-3 bg-rose-500 text-white font-bold rounded-lg shadow-lg hover:bg-rose-600 transition-all">
        Get Started
      </button>
    </div>
  );
}
`;

export default function EditorPage() {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [code, setCode] = useState(initialCode);

  interface ElementSelectedData {
    id: string;
    [key: string]: string | number | boolean | null;
  }

  const [selectedElement, setSelectedElement] =
    useState<ElementSelectedData | null>(null);

  useEffect(() => {
    interface MessageEventData {
      type: string;
      data: ElementSelectedData;
    }

    const handleMessage = (event: MessageEvent<MessageEventData>) => {
      // Ensure the message is from our iframe, not other browser extensions
      if (
        (event.source as Window | null)?.location?.pathname !==
        "/iframe-preview.html"
      ) {
        return;
      }

      const { type, data } = event.data;
      if (type === "ELEMENT_SELECTED") {
        setSelectedElement(data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  interface StyleChangePayload {
    elementId: string;
    newStyles: Record<string, string>;
  }

  interface UpdateStyleMessage {
    type: "UPDATE_STYLE";
    payload: StyleChangePayload;
  }

  const handleStyleChange = (
    elementId: string,
    newStyles: Record<string, string>
  ): void => {
    const iframe = document.querySelector(
      'iframe[title="Component Preview"]'
    ) as HTMLIFrameElement | null;

    if (iframe?.contentWindow) {
      const message: UpdateStyleMessage = {
        type: "UPDATE_STYLE",
        payload: { elementId, newStyles },
      };
      iframe.contentWindow.postMessage(message, "*");
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Panel: Style Inspector */}
      <aside className="w-[350px] border-r border-border flex-shrink-0">
        <StyleInspector
          selectedElement={selectedElement}
          onStyleChange={handleStyleChange}
        />
      </aside>

      {/* Right Panel: Main View */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-center p-2 border-b border-border">
          <ViewToggle view={view} setView={setView} />
        </header>
        <div className="flex-1 relative">
          {view === "preview" && <Preview code={code} />}
          {view === "code" && <CodeEditor code={code} setCode={setCode} />}
        </div>
      </main>
    </div>
  );
}
