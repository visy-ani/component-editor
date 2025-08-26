"use client";
import Editor from "@monaco-editor/react";

export function CodeEditor({ code, setCode }) {
  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 20 },
        }}
      />
    </div>
  );
}
