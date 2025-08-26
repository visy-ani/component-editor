import { Button } from "@/components/ui/button";
import { Code, Eye } from "lucide-react";

export function ViewToggle({ view, setView }) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant={view === "preview" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setView("preview")}
      >
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>
      <Button
        variant={view === "code" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setView("code")}
      >
        <Code className="h-4 w-4 mr-2" />
        Code
      </Button>
    </div>
  );
}
