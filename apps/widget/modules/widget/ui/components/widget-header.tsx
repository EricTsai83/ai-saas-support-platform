import { Button } from "@workspace/ui/components/button";
import { HomeIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "bg-linear-to-b from-primary to-[#0b63f3] p-4 text-primary-foreground",
        className,
      )}
    >
      {children}
    </header>
  );
};
