import { BookOpen, Grid3x3, Home, Library, Users } from "lucide-react";
import type { TabName } from "../types";

const TABS: { id: TabName; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "categories", label: "Browse", Icon: Grid3x3 },
  { id: "library", label: "Library", Icon: Library },
  { id: "community", label: "Community", Icon: Users },
  { id: "dictionary", label: "Dictionary", Icon: BookOpen },
];

export function BottomNav({
  activeTab,
  onTabChange,
}: { activeTab: TabName; onTabChange: (t: TabName) => void }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bottom-nav bg-card/95 backdrop-blur-sm border-t border-border z-40">
      <div className="flex">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              type="button"
              key={id}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onTabChange(id)}
              data-ocid={`nav.${id}.link`}
            >
              <div
                className={`p-1.5 rounded-lg transition-all ${isActive ? "bg-primary/20" : ""}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
