import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { BookCard } from "../components/BookCard";
import type { Book, UserLibrary } from "../types";

const CATEGORY_META: Record<string, { emoji: string; description: string }> = {
  Fiction: {
    emoji: "📖",
    description: "Stories that transport you to other worlds and lives",
  },
  Science: {
    emoji: "🔬",
    description: "Explore the frontiers of human knowledge",
  },
  History: { emoji: "🏛️", description: "Learn from the stories of our past" },
  Mystery: {
    emoji: "🔍",
    description: "Puzzles, thrills, and unexpected twists",
  },
  Fantasy: {
    emoji: "🐉",
    description: "Magic, adventure, and boundless imagination",
  },
  Biography: {
    emoji: "👤",
    description: "Inspiring lives of remarkable people",
  },
  Romance: {
    emoji: "💕",
    description: "Stories of love, connection, and the heart",
  },
  "Non-Fiction": {
    emoji: "💡",
    description: "Real-world insights and practical wisdom",
  },
};

interface CategoriesTabProps {
  books: Book[];
  userLibrary: UserLibrary;
  onRead: (book: Book) => void;
  onAddToLibrary: (bookId: string) => void;
  initialCategory?: string;
  onClearCategory?: () => void;
}

export function CategoriesTab({
  books,
  userLibrary,
  onRead,
  onAddToLibrary,
  initialCategory,
  onClearCategory,
}: CategoriesTabProps) {
  const [selected, setSelected] = useState<string | null>(
    initialCategory || null,
  );
  const categories = Object.keys(CATEGORY_META);
  const bookCounts = categories.reduce(
    (acc, cat) => {
      acc[cat] = books.filter((b) => b.category === cat).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (selected) {
    const filtered = books.filter((b) => b.category === selected);
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => {
              setSelected(null);
              onClearCategory?.();
            }}
            data-ocid="categories.back_button"
          >
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{CATEGORY_META[selected]?.emoji}</span>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                {selected}
              </h2>
              <p className="text-xs text-muted-foreground">
                {filtered.length} books
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          {filtered.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              userLibrary={userLibrary}
              onRead={onRead}
              onAddToLibrary={onAddToLibrary}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-display text-base font-semibold text-foreground mb-4">
        All Categories
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setSelected(cat)}
            className="relative overflow-hidden rounded-xl bg-card border border-border p-4 text-left hover:border-primary/50 transition-all"
            data-ocid={`categories.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.button`}
          >
            <div className="text-3xl mb-2">{CATEGORY_META[cat]?.emoji}</div>
            <p className="font-semibold text-foreground text-sm">{cat}</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
              {CATEGORY_META[cat]?.description}
            </p>
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
              {bookCounts[cat]} books
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
