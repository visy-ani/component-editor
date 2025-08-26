"use client";
import { Card, CardContent } from "@/components/ui/card";

const getElementClasses = (elementId, selectedElement, previewMode) => {
  let classes = "cursor-pointer transition-all duration-300";
  if (selectedElement === elementId) {
    classes += " ring-2 ring-primary ring-offset-background ring-offset-2";
  } else if (!previewMode) {
    classes += " hover:ring-1 hover:ring-primary/50";
  }
  return classes;
};

export function EditorPreview({
  styles,
  onElementClick,
  selectedElement,
  previewMode,
}) {
  const getInlineStyles = (elementId) => {
    const style = styles[elementId];
    return {
      ...style,
      border: `${style.borderWidth} solid ${style.borderColor}`,
    };
  };

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h1
              className={getElementClasses(
                "heading",
                selectedElement,
                previewMode
              )}
              style={getInlineStyles("heading")}
              onClick={() => onElementClick("heading")}
            >
              Welcome to the Future
            </h1>
            <p
              className={getElementClasses(
                "paragraph",
                selectedElement,
                previewMode
              )}
              style={getInlineStyles("paragraph")}
              onClick={() => onElementClick("paragraph")}
            >
              This modular editor allows for clean and efficient customization.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="space-y-4">
            <button
              className={getElementClasses(
                "button",
                selectedElement,
                previewMode
              )}
              style={getInlineStyles("button")}
              onClick={() => onElementClick("button")}
            >
              Get Started
            </button>
            <input
              type="text"
              placeholder="Enter your email..."
              className={`w-full ${getElementClasses(
                "input",
                selectedElement,
                previewMode
              )}`}
              style={getInlineStyles("input")}
              onClick={() => onElementClick("input")}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
