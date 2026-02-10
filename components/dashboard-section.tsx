import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

interface DashboardSectionProps {
  titleKey: string;
  children: ReactNode;
  showSeparator?: boolean;
}

export function DashboardSection({ 
  titleKey, 
  children,
  showSeparator = true 
}: DashboardSectionProps) {
  // For server components, we'll use the key directly as a fallback
  // The actual translation will be handled by the parent component
  const title = titleKey;

  return (
    <>
      {showSeparator && <Separator />}
      <section>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </section>
    </>
  );
}
