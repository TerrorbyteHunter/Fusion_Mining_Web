import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
};

export function NotificationBell() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Sound toggle (persisted in localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const raw = localStorage.getItem('notifSoundEnabled');
      return raw ? JSON.parse(raw) : false;
    } catch { return false; }
  });

  // Fetch notifications
  const { data: notifications = [], refetch: refetchNotifications } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated,
  });

  // Auto-refresh notifications every 5 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      refetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, refetchNotifications]);

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  const markAsRead = async (notificationId: string) => {
    await apiRequest("POST", `/api/notifications/${notificationId}/read`, {});
    refetchNotifications();
  };

  const markAllAsRead = async () => {
    await apiRequest("POST", "/api/notifications/mark-all-read", {});
    refetchNotifications();
  };

  // Play a short beep using WebAudio
  const playNotificationSound = async () => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        console.warn('Web Audio API not available');
        return;
      }
      const ctx = new AudioCtx();
      // Resume audio context if required by browser (user gesture needed)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 800; // Slightly lower frequency for better audibility
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime);
      o.stop(ctx.currentTime + 0.2);
    } catch (err) {
      console.warn('Failed to play notification sound', err);
    }
  };

  // Track previous unread count to detect new notifications (ignore initial load)
  const prevUnreadRef = (window as any).__prevNotifUnreadCountRef || { current: 0 };
  (window as any).__prevNotifUnreadCountRef = prevUnreadRef;
  const initialLoadedRef = (window as any).__notifInitialLoadedRef || { current: false };
  (window as any).__notifInitialLoadedRef = initialLoadedRef;

  useEffect(() => {
    if (!isAuthenticated) return;
    const prev = prevUnreadRef.current || 0;
    if (!initialLoadedRef.current) {
      // First time - initialize and don't play sound
      prevUnreadRef.current = unreadCount;
      initialLoadedRef.current = true;
      console.log('[Notifications] Initial load, unreadCount:', unreadCount);
      return;
    }
    if (soundEnabled && unreadCount > prev) {
      console.log('[Notifications] New notification detected, playing sound. Prev:', prev, 'Now:', unreadCount);
      playNotificationSound();
    }
    prevUnreadRef.current = unreadCount;
  }, [notifications, unreadCount, soundEnabled, isAuthenticated]);

  useEffect(() => {
    try { localStorage.setItem('notifSoundEnabled', JSON.stringify(soundEnabled)); } catch {}
  }, [soundEnabled]);

  if (!isAuthenticated) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          data-testid="notification-bell"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <div className="flex items-center gap-2">
            <Button
              variant={soundEnabled ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSoundEnabled(s => !s)}
              className="text-xs"
              aria-pressed={soundEnabled}
              title={soundEnabled ? 'Notification sound: On' : 'Notification sound: Off'}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-auto">
          {(notifications || []).length > 0 ? (
            <div className="divide-y">
              {(notifications || []).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                    !notification.read && "bg-muted/20"
                  )}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                    setIsOpen(false);
                  }}
                >
                  <div className="flex justify-between gap-2">
                    <h5 className="font-medium">{notification.title}</h5>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}