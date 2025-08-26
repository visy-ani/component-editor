"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function EditorHeader({ previewMode, setPreviewMode, onReset, onSave }) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Component Editor</h1>
          <Badge variant="secondary">Pro</Badge>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <Label htmlFor="preview-mode" className="text-sm">
              Preview
            </Label>
            <Switch
              id="preview-mode"
              checked={previewMode}
              onCheckedChange={setPreviewMode}
            />
          </div>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button
            onClick={onSave}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
