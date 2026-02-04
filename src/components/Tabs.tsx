import type { ButtonHTMLAttributes } from "react";

export type TabsProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  buttonProps
}: TabsProps<T>) {
  return (
    <div className="flex w-full border-b border-ink/10">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`mr-8 py-4 text-sm font-medium transition-all ${isActive
                ? "border-b-2 border-ink text-ink"
                : "text-ink/40 hover:text-ink/70"
              }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
