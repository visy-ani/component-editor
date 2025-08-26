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

export function EffectsControls({ styles, updateStyle }) {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Opacity</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[styles.opacity]}
            onValueChange={(v) => updateStyle("opacity", v[0])}
            max={1}
            min={0}
            step={0.1}
          />
          <span className="text-xs w-12 text-right">{styles.opacity}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <Label className="text-sm font-medium">Shadow</Label>
        <Select
          value={styles.boxShadow}
          onValueChange={(v) => updateStyle("boxShadow", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)">
              Medium
            </SelectItem>
            <SelectItem value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)">
              Large
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
