"use client";

import { useState, useEffect } from "react";
import { StyleInspector } from "@/components/editor/StyleInspector";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Preview } from "@/components/editor/Preview";
import { ViewToggle } from "@/components/editor/ViewToggle";

const fallbackCode = `
// Default fallback component
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
  const [code, setCode] = useState<string>(fallbackCode);

  const [selectedElement, setSelectedElement] = useState<{
    id: string;
    [key: string]: string | number | boolean | null;
  } | null>(null);

  useEffect(() => {
    const loadSavedCode = async () => {
      const id = localStorage.getItem("savedComponentId");
      if (!id) return;

      try {
        const res = await fetch(`/api/component/${id}`);
        if (!res.ok) throw new Error("Component not found");

        const data = await res.json();
        if (data?.code) {
          setCode(data.code);
        } else {
          console.warn("No code found in response. Loading fallback.");
          setCode(fallbackCode);
        }
      } catch (error) {
        console.error("Error loading component:", error);
        setCode(fallbackCode);
      }
    };

    loadSavedCode();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        (event.source as Window | null)?.location?.pathname !==
        "/iframe-preview.html"
      ) {
        return;
      }

      if (event.data?.type === "ELEMENT_SELECTED") {
        setSelectedElement(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleStyleChange = (
    elementId: string,
    newStyles: Record<string, string>
  ) => {
    const iframe = document.querySelector(
      'iframe[title="Component Preview"]'
    ) as HTMLIFrameElement | null;

    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "UPDATE_STYLE",
          payload: { elementId, newStyles },
        },
        "*"
      );
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Failed to save component");

      const data = await response.json();
      localStorage.setItem("savedComponentId", data.id);
      alert(`Component saved! ID: ${data.id}`);
    } catch (error) {
      console.error("Error saving component:", error);
      alert("Error saving component. Check console.");
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-[350px] border-r border-border flex-shrink-0">
        <StyleInspector
          selectedElement={selectedElement}
          onStyleChange={handleStyleChange}
        />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-center p-2 border-b border-border space-x-4">
          <ViewToggle view={view} setView={setView} />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save Component
          </button>
        </header>
        <div className="flex-1 relative">
          {view === "preview" && <Preview code={code} />}
          {view === "code" && <CodeEditor code={code} setCode={setCode} />}
        </div>
      </main>
    </div>
  );
}
