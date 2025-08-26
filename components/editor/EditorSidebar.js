"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getElementDisplayName } from "@/lib/styles";
import { StyleControls } from "./controls/StyleControls";
import { LayoutControls } from "./controls/LayoutControls";
import { EffectsControls } from "./controls/EffectsControls";

export function EditorSidebar({ selectedElement, styles, onStyleUpdate }) {
  if (!selectedElement) {
    return (
      <aside className="w-96 bg-sidebar border-l p-6 text-center text-sidebar-foreground/70">
        <p>Select a component to start editing.</p>
      </aside>
    );
  }

  const currentStyles = styles[selectedElement];

  return (
    <aside className="w-96 bg-sidebar border-l">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">
          Design Controls
        </h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          Editing:{" "}
          <span className="font-medium text-sidebar-primary">
            {getElementDisplayName(selectedElement)}
          </span>
        </p>
      </div>

      <Tabs defaultValue="style" className="p-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>
        <TabsContent value="style" className="space-y-6 mt-4">
          <StyleControls
            styles={currentStyles}
            updateStyle={(prop, val) =>
              onStyleUpdate(selectedElement, prop, val)
            }
          />
        </TabsContent>
        <TabsContent value="layout" className="space-y-6 mt-4">
          <LayoutControls
            styles={currentStyles}
            updateStyle={(prop, val) =>
              onStyleUpdate(selectedElement, prop, val)
            }
          />
        </TabsContent>
        <TabsContent value="effects" className="space-y-6 mt-4">
          <EffectsControls
            styles={currentStyles}
            updateStyle={(prop, val) =>
              onStyleUpdate(selectedElement, prop, val)
            }
          />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
