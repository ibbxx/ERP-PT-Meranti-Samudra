import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "glass" | "solid";
};

export default function Card({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-ink/5 bg-white shadow-sm transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
