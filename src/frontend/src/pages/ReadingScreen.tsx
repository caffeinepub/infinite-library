import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BOOK_CONTENT } from "../data/seed";
import type { Book, ReaderSettings } from "../types";

const THEME_STYLES: Record<
  ReaderSettings["theme"],
  { bg: string; text: string; toolbar: string }
> = {
  dark: {
    bg: "bg-[#1a1a2e]",
    text: "text-[#e8e8f0]",
    toolbar: "bg-[#16213e] border-[#2d2d5e]",
  },
  sepia: {
    bg: "bg-[#f4ede0]",
    text: "text-[#3a2a1a]",
    toolbar: "bg-[#ede0c8] border-[#d4c4a8]",
  },
  white: {
    bg: "bg-white",
    text: "text-[#1a1a1a]",
    toolbar: "bg-[#f5f5f5] border-[#e0e0e0]",
  },
};

const FONT_MAP: Record<ReaderSettings["fontFamily"], string> = {
  serif: "font-display",
  "sans-serif": "font-sans",
  monospace: "font-mono",
};

interface ReadingScreenProps {
  book: Book;
  currentPage: number;
  settings: ReaderSettings;
  onClose: () => void;
  onPageChange: (page: number) => void;
  onSettingsChange: (settings: ReaderSettings) => void;
  bookContentCache: Record<string, string[]>;
  onFetchContent: (bookId: string, textUrl: string) => Promise<void>;
  isFetchingContent: boolean;
}

export function ReadingScreen({
  book,
  currentPage,
  settings,
  onClose,
  onPageChange,
  onSettingsChange,
  bookContentCache,
  onFetchContent,
  isFetchingContent,
}: ReadingScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const themeStyle = THEME_STYLES[settings.theme];
  const fontClass = FONT_MAP[settings.fontFamily];
  const page = Math.max(1, currentPage);
  const cachedContent = bookContentCache[book.id];
  const hasCache = cachedContent && cachedContent.length > 0;

  // Fetch gutenberg content on mount if needed
  useEffect(() => {
    if (book.textUrl && !hasCache) {
      onFetchContent(book.id, book.textUrl);
    }
  }, [book.id, book.textUrl, hasCache, onFetchContent]);

  const content = hasCache
    ? cachedContent
    : BOOK_CONTENT[book.id] || BOOK_CONTENT.default;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${themeStyle.bg} fade-in`}
      data-ocid="reader.page"
    >
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${themeStyle.toolbar}`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onClose}
          data-ocid="reader.close_button"
        >
          <ArrowLeft size={20} className={themeStyle.text} />
        </Button>
        <div className="text-center">
          <p
            className={`text-sm font-semibold line-clamp-1 ${themeStyle.text}`}
          >
            {book.title}
          </p>
          <p className={`text-xs opacity-60 ${themeStyle.text}`}>
            {book.author}
          </p>
        </div>
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              data-ocid="reader.settings.button"
            >
              <Settings size={18} className={themeStyle.text} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-card border-border rounded-t-2xl"
            data-ocid="reader.settings.panel"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-foreground">
                Reading Settings
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-5 py-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Font Size
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {settings.fontSize}px
                  </span>
                </div>
                <Slider
                  min={12}
                  max={24}
                  step={1}
                  value={[settings.fontSize]}
                  onValueChange={([v]) =>
                    onSettingsChange({ ...settings, fontSize: v })
                  }
                  data-ocid="reader.font_size.input"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Line Height
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {settings.lineHeight.toFixed(1)}
                  </span>
                </div>
                <Slider
                  min={12}
                  max={20}
                  step={1}
                  value={[Math.round(settings.lineHeight * 10)]}
                  onValueChange={([v]) =>
                    onSettingsChange({ ...settings, lineHeight: v / 10 })
                  }
                  data-ocid="reader.line_height.input"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Font</p>
                <div className="flex gap-2">
                  {(["serif", "sans-serif", "monospace"] as const).map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() =>
                        onSettingsChange({ ...settings, fontFamily: f })
                      }
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                        settings.fontFamily === f
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                      data-ocid={`reader.font_${f.replace("-", "_")}.button`}
                    >
                      {f === "serif"
                        ? "Serif"
                        : f === "sans-serif"
                          ? "Sans"
                          : "Mono"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Background</p>
                <div className="flex gap-2">
                  {(["dark", "sepia", "white"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() =>
                        onSettingsChange({ ...settings, theme: t })
                      }
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                        settings.theme === t
                          ? "border-primary ring-1 ring-primary"
                          : "border-border"
                      } ${
                        t === "dark"
                          ? "bg-[#1a1a2e] text-[#e8e8f0]"
                          : t === "sepia"
                            ? "bg-[#f4ede0] text-[#3a2a1a]"
                            : "bg-white text-[#1a1a1a]"
                      }`}
                      data-ocid={`reader.theme_${t}.button`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 relative">
        {isFetchingContent && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            data-ocid="reader.loading_state"
          >
            <Loader2
              size={32}
              className="animate-spin"
              style={{
                color: settings.theme === "dark" ? "#e8e8f0" : "#1a1a1a",
              }}
            />
            <p className={`text-sm opacity-60 ${themeStyle.text}`}>
              Loading book content…
            </p>
          </div>
        )}
        {!isFetchingContent &&
          content.map((para) => (
            <p
              key={para.slice(0, 40)}
              className={`${themeStyle.text} ${fontClass} leading-relaxed mt-6 first:mt-0`}
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight,
              }}
            >
              {para}
            </p>
          ))}
      </div>

      <div
        className={`flex items-center justify-between px-4 py-3 border-t ${themeStyle.toolbar}`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          data-ocid="reader.pagination_prev"
        >
          <ChevronLeft size={20} className={themeStyle.text} />
        </Button>
        <span className={`text-sm opacity-70 ${themeStyle.text}`}>
          Page {page} of {book.totalPages}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          disabled={page >= book.totalPages}
          onClick={() => onPageChange(page + 1)}
          data-ocid="reader.pagination_next"
        >
          <ChevronRight size={20} className={themeStyle.text} />
        </Button>
      </div>
    </div>
  );
}
