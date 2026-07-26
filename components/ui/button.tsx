import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition active:scale-[0.98]",
        variant === "primary" &&
          "bg-primary text-white shadow-sm shadow-primary/30 hover:brightness-110",
        variant === "outline" &&
          "border border-border text-foreground hover:border-primary/50",
        variant === "ghost" && "text-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
