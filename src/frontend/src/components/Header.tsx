import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface HeaderProps {
  unreadCount: number;
  onNotificationsOpen: () => void;
}

export function Header({ unreadCount, onNotificationsOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <img
          src="/assets/generated/logo-infinite-library-transparent.dim_120x120.png"
          alt="Infinite Library"
          className="w-8 h-8 rounded-lg"
        />
        <span className="font-display text-lg font-semibold gradient-text">
          Infinite Library
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
        onClick={onNotificationsOpen}
        data-ocid="notifications.open_modal_button"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
    </header>
  );
}
