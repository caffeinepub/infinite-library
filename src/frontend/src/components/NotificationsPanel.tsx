import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BookmarkPlus, Check, X } from "lucide-react";
import type { Notification } from "../types";
import { formatDistanceToNow } from "../utils/time";

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onAddToReadingList: (notif: Notification) => void;
}

export function NotificationsPanel({
  notifications,
  onClose,
  onMarkAllRead,
  onAddToReadingList,
}: NotificationsPanelProps) {
  const unread = notifications.filter((n) => !n.isRead).length;
  return (
    <div className="fixed inset-0 z-50 fade-in" data-ocid="notifications.panel">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full"
        onClick={onClose}
        aria-label="Close notifications"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-card border-b border-border slide-up max-h-[80vh] flex flex-col rounded-b-2xl overflow-hidden shadow-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <h2 className="font-semibold text-foreground">Notifications</h2>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                {unread} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground h-7"
                onClick={onMarkAllRead}
                data-ocid="notifications.secondary_button"
              >
                <Check size={12} className="mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onClose}
              data-ocid="notifications.close_button"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1">
          {notifications.length === 0 ? (
            <div
              className="py-12 text-center"
              data-ocid="notifications.empty_state"
            >
              <Bell size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notif, i) => (
                <div
                  key={notif.id}
                  className={`p-4 ${!notif.isRead ? "bg-primary/5" : ""}`}
                  data-ocid={`notifications.item.${i + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.isRead ? "bg-muted" : "bg-primary"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {formatDistanceToNow(notif.timestamp)}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 h-7 text-xs border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => onAddToReadingList(notif)}
                        data-ocid={`notifications.secondary_button.${i + 1}`}
                      >
                        <BookmarkPlus size={12} className="mr-1" />
                        Add to Reading List
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
