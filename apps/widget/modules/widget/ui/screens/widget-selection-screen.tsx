"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";

export const WidgetSelectionScreen = () => {
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 🤖</p>
          <p className="text-lg">It looks like something went wrong.</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <p className="text-sm">selection screen!!!</p>
      </div>
    </>
  );
};
