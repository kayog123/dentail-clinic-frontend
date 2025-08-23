import { cn } from "@/app/lib/utils";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-7xl mx-auto xs:px-2", className)}>{children}</div>
  );
}
