"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function StyleInspector({ selectedElement, onStyleChange }) {
  if (!selectedElement) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Select an element to inspect
        </p>
      </div>
    );
  }

  const handleStyleUpdate = (property, value) => {
    onStyleChange(selectedElement.id, { [property]: value });
  };

  return (
    <div className="p-4 h-full bg-sidebar text-sidebar-foreground">
      <div className="text-center mb-4">
        <p className="font-bold text-lg capitalize">{selectedElement.tag}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {selectedElement.id}
        </p>
      </div>
      <Separator />
      <div className="space-y-6 mt-4">
        <div className="space-y-2">
          <Label>Color</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Text</Label>
              <Input
                type="color"
                onChange={(e) => handleStyleUpdate("color", e.target.value)}
                className="p-1 h-10 w-full mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Background</Label>
              <Input
                type="color"
                onChange={(e) =>
                  handleStyleUpdate("backgroundColor", e.target.value)
                }
                className="p-1 h-10 w-full mt-1"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Spacing</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Padding</Label>
              <Input
                placeholder="16px"
                onChange={(e) => handleStyleUpdate("padding", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Margin</Label>
              <Input
                placeholder="8px"
                onChange={(e) => handleStyleUpdate("margin", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
