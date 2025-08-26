import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function StyleControls({ styles, updateStyle }) {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Colors</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="text-color" className="text-xs">
              Text
            </Label>
            <input
              id="text-color"
              type="color"
              value={styles.color}
              onChange={(e) => updateStyle("color", e.target.value)}
              className="w-full h-10 rounded border-border cursor-pointer bg-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-xs">
              Background
            </Label>
            <input
              id="bg-color"
              type="color"
              value={styles.backgroundColor}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              className="w-full h-10 rounded border-border cursor-pointer bg-input"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <Label className="text-sm font-medium">Typography</Label>
        <div className="space-y-3">
          <div>
            <Label htmlFor="font-size" className="text-xs">
              Font Size
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Slider
                value={[parseInt(styles.fontSize)]}
                onValueChange={(v) => updateStyle("fontSize", `${v[0]}px`)}
                max={72}
                min={8}
                step={1}
              />
              <span className="text-xs w-12 text-right">{styles.fontSize}</span>
            </div>
          </div>
          <div>
            <Label className="text-xs">Font Weight</Label>
            <Select
              value={styles.fontWeight}
              onValueChange={(v) => updateStyle("fontWeight", v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Light</SelectItem>
                <SelectItem value="400">Normal</SelectItem>
                <SelectItem value="500">Medium</SelectItem>
                <SelectItem value="700">Bold</SelectItem>
                <SelectItem value="900">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
