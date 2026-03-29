import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { BottomNav } from "./components/BottomNav";
import { Header } from "./components/Header";
import { NotificationsPanel } from "./components/NotificationsPanel";
import {
  SEED_BOOKS,
  SEED_DICTIONARY,
  SEED_NOTIFICATIONS,
  SEED_REVIEWS,
} from "./data/seed";
import { useActor } from "./hooks/useActor";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CategoriesTab } from "./pages/CategoriesTab";
import { CommunityTab } from "./pages/CommunityTab";
import { DictionaryTab } from "./pages/DictionaryTab";
import { GutenbergSearch } from "./pages/GutenbergSearch";
import { HomeTab } from "./pages/HomeTab";
import { LibraryTab } from "./pages/LibraryTab";
import { ReadingScreen } from "./pages/ReadingScreen";
import type {
  Book,
  DictionaryWord,
  Notification,
  ReaderSettings,
  ReadingProgress,
  Review,
  TabName,
  UserLibrary,
} from "./types";

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 17,
  fontFamily: "serif",
  lineHeight: 1.8,
  theme: "dark",
};

export default function App() {
  const { actor } = useActor();
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGutenberg, setShowGutenberg] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isFetchingContent, setIsFetchingContent] = useState(false);

  const [books, setBooks] = useLocalStorage<Book[]>("lib_books", SEED_BOOKS);
  const [bookContentCache, setBookContentCache] = useLocalStorage<
    Record<string, string[]>
  >("lib_book_content", {});
  const [userLibrary, setUserLibrary] = useLocalStorage<UserLibrary>(
    "lib_user_library",
    {},
  );
  const [readingProgress, setReadingProgress] =
    useLocalStorage<ReadingProgress>("lib_reading_progress", {});
  const [dictionary, setDictionary] = useLocalStorage<DictionaryWord[]>(
    "lib_dictionary",
    SEED_DICTIONARY,
  );
  const [reviews, setReviews] = useLocalStorage<Review[]>(
    "lib_reviews",
    SEED_REVIEWS,
  );
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    "lib_notifications",
    SEED_NOTIFICATIONS,
  );
  const [readerSettings, setReaderSettings] = useLocalStorage<ReaderSettings>(
    "lib_reader_settings",
    DEFAULT_SETTINGS,
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleAddToLibrary = useCallback(
    (bookId: string) => {
      setUserLibrary((prev) => {
        if (prev[bookId] === "library") {
          const next = { ...prev };
          delete next[bookId];
          toast.info("Removed from library");
          return next;
        }
        toast.success("Added to library");
        return { ...prev, [bookId]: "library" };
      });
    },
    [setUserLibrary],
  );

  const handleRead = useCallback((book: Book) => setReadingBook(book), []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (!readingBook) return;
      setReadingProgress((prev) => ({ ...prev, [readingBook.id]: page }));
    },
    [readingBook, setReadingProgress],
  );

  const handleAddReview = useCallback(
    (review: Omit<Review, "id" | "createdAt">) => {
      setReviews((prev) => [
        ...prev,
        {
          ...review,
          id: `r${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [setReviews],
  );

  const handleAddWord = useCallback(
    (word: Omit<DictionaryWord, "id" | "addedAt">) => {
      setDictionary((prev) => [
        ...prev,
        { ...word, id: `w${Date.now()}`, addedAt: new Date().toISOString() },
      ]);
    },
    [setDictionary],
  );

  const handleDeleteWord = useCallback(
    (id: string) => {
      setDictionary((prev) => prev.filter((w) => w.id !== id));
    },
    [setDictionary],
  );

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, [setNotifications]);

  const handleAddToReadingList = useCallback(
    (notif: Notification) => {
      setUserLibrary((prev) => ({ ...prev, [notif.bookId]: "reading_list" }));
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n)),
      );
      toast.success("Added to Reading List!");
    },
    [setUserLibrary, setNotifications],
  );

  const handleCategorySelect = useCallback((category: string) => {
    setCategoryFilter(category);
    setActiveTab("categories");
  }, []);

  const handleImportBook = useCallback(
    (book: Book) => {
      setBooks((prev) => {
        // Avoid duplicates by gutenbergId
        if (
          book.gutenbergId &&
          prev.some((b) => b.gutenbergId === book.gutenbergId)
        ) {
          toast.info("Already in library");
          return prev;
        }
        toast.success("Book imported!");
        return [...prev, book];
      });
    },
    [setBooks],
  );

  const handleFetchContent = useCallback(
    async (bookId: string, textUrl: string) => {
      if (!actor) {
        toast.error("Backend not available");
        return;
      }
      setIsFetchingContent(true);
      try {
        const text = await actor.fetchGutenbergText(textUrl);
        const paragraphs = text
          .split("\n\n")
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
          .slice(0, 80);
        setBookContentCache((prev) => ({ ...prev, [bookId]: paragraphs }));
      } catch {
        toast.error("Failed to load book content");
      } finally {
        setIsFetchingContent(false);
      }
    },
    [actor, setBookContentCache],
  );

  if (readingBook) {
    return (
      <ReadingScreen
        book={readingBook}
        currentPage={readingProgress[readingBook.id] || 1}
        settings={readerSettings}
        onClose={() => setReadingBook(null)}
        onPageChange={handlePageChange}
        onSettingsChange={setReaderSettings}
        bookContentCache={bookContentCache}
        onFetchContent={handleFetchContent}
        isFetchingContent={isFetchingContent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-mobile flex flex-col min-h-screen relative">
        <Header
          unreadCount={unreadCount}
          onNotificationsOpen={() => setShowNotifications(true)}
        />
        <main className="flex-1 overflow-y-auto pb-20">
          {activeTab === "home" && (
            <HomeTab
              books={books}
              userLibrary={userLibrary}
              onRead={handleRead}
              onAddToLibrary={handleAddToLibrary}
              onCategorySelect={handleCategorySelect}
              onOpenGutenberg={() => setShowGutenberg(true)}
            />
          )}
          {activeTab === "categories" && (
            <CategoriesTab
              books={books}
              userLibrary={userLibrary}
              onRead={handleRead}
              onAddToLibrary={handleAddToLibrary}
              initialCategory={categoryFilter || undefined}
              onClearCategory={() => setCategoryFilter(null)}
            />
          )}
          {activeTab === "library" && (
            <LibraryTab
              books={books}
              userLibrary={userLibrary}
              onRead={handleRead}
              onAddToLibrary={handleAddToLibrary}
            />
          )}
          {activeTab === "community" && (
            <CommunityTab
              books={books}
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          )}
          {activeTab === "dictionary" && (
            <DictionaryTab
              words={dictionary}
              onAddWord={handleAddWord}
              onDeleteWord={handleDeleteWord}
            />
          )}
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        {showNotifications && (
          <NotificationsPanel
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkAllRead={handleMarkAllRead}
            onAddToReadingList={handleAddToReadingList}
          />
        )}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "oklch(0.22 0.025 250)",
              border: "1px solid oklch(0.28 0.03 250)",
              color: "oklch(0.95 0.01 250)",
            },
          }}
        />
      </div>
      <footer className="fixed bottom-16 left-0 right-0 flex justify-center pointer-events-none">
        <p className="text-[10px] text-muted-foreground/40 pointer-events-auto">
          © {new Date().getFullYear()}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Gutenberg Search Overlay */}
      <AnimatePresence>
        {showGutenberg && (
          <GutenbergSearch
            existingBooks={books}
            onImportBook={handleImportBook}
            onClose={() => setShowGutenberg(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
