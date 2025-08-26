import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function LayoutControls({ styles, updateStyle }) {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Spacing</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="padding" className="text-xs">
              Padding
            </Label>
            <Input
              id="padding"
              value={styles.padding}
              onChange={(e) => updateStyle("padding", e.target.value)}
              placeholder="e.g., 8px 16px"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="margin" className="text-xs">
              Margin
            </Label>
            <Input
              id="margin"
              value={styles.margin}
              onChange={(e) => updateStyle("margin", e.target.value)}
              placeholder="e.g., 16px 0"
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <Label className="text-sm font-medium">Border</Label>
        <div className="space-y-3">
          <div>
            <Label htmlFor="border-radius" className="text-xs">
              Radius
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Slider
                value={[parseInt(styles.borderRadius)]}
                onValueChange={(v) => updateStyle("borderRadius", `${v[0]}px`)}
                max={50}
                min={0}
                step={1}
              />
              <span className="text-xs w-12 text-right">
                {styles.borderRadius}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="border-width" className="text-xs">
                Width
              </Label>
              <Input
                id="border-width"
                value={styles.borderWidth}
                onChange={(e) => updateStyle("borderWidth", e.target.value)}
                placeholder="e.g., 1px"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="border-color" className="text-xs">
                Color
              </Label>
              <input
                id="border-color"
                type="color"
                value={styles.borderColor}
                onChange={(e) => updateStyle("borderColor", e.target.value)}
                className="w-full h-10 rounded border-border cursor-pointer mt-1 bg-input"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
