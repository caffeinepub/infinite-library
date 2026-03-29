import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Search, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { BookCard, BookCardCompact } from "../components/BookCard";
import type { Book, UserLibrary } from "../types";

const CATEGORIES = [
  { name: "Fiction", emoji: "📖" },
  { name: "Science", emoji: "🔬" },
  { name: "History", emoji: "🏛️" },
  { name: "Mystery", emoji: "🔍" },
  { name: "Fantasy", emoji: "🐉" },
  { name: "Biography", emoji: "👤" },
  { name: "Romance", emoji: "💕" },
  { name: "Non-Fiction", emoji: "💡" },
];

interface HomeTabProps {
  books: Book[];
  userLibrary: UserLibrary;
  onRead: (book: Book) => void;
  onAddToLibrary: (bookId: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenGutenberg: () => void;
}

export function HomeTab({
  books,
  userLibrary,
  onRead,
  onAddToLibrary,
  onCategorySelect,
  onOpenGutenberg,
}: HomeTabProps) {
  const [search, setSearch] = useState("");
  const newBooks = books.filter((b) => b.isNew);
  const filteredBooks = search
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase()) ||
          b.category.toLowerCase().includes(search.toLowerCase()),
      )
    : books;

  return (
    <div className="flex flex-col gap-0 pb-2">
      <div className="px-4 py-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search books, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground h-10"
            data-ocid="home.search_input"
          />
        </div>
      </div>

      {/* Gutenberg Discovery Banner */}
      {!search && (
        <div className="px-4 mb-4">
          <button
            type="button"
            onClick={onOpenGutenberg}
            className="w-full rounded-2xl overflow-hidden relative group"
            data-ocid="home.gutenberg.button"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.16 52) 0%, oklch(0.68 0.14 60) 50%, oklch(0.72 0.12 70) 100%)",
              }}
            />
            <div className="relative flex items-center gap-3 px-4 py-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                <BookOpen size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-semibold text-sm leading-tight">
                    Discover on Gutenberg
                  </p>
                  <Sparkles size={12} className="text-yellow-200" />
                </div>
                <p className="text-white/80 text-[11px] mt-0.5 leading-tight">
                  Search thousands of free classic books
                </p>
              </div>
              <Badge className="bg-white/25 text-white border-white/25 text-[10px] shrink-0">
                Free
              </Badge>
            </div>
          </button>
        </div>
      )}

      {search ? (
        <div className="px-4">
          <p className="text-xs text-muted-foreground mb-3">
            {filteredBooks.length} result{filteredBooks.length !== 1 ? "s" : ""}{" "}
            for "{search}"
          </p>
          {filteredBooks.length === 0 ? (
            <div className="py-8 text-center" data-ocid="home.empty_state">
              <Search
                size={32}
                className="text-muted-foreground mx-auto mb-2"
              />
              <p className="text-muted-foreground text-sm mb-3">
                No books found locally
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenGutenberg}
                className="border-primary/40 text-primary hover:bg-primary/10"
                data-ocid="home.gutenberg_empty.button"
              >
                <BookOpen size={14} className="mr-1.5" />
                Search Gutenberg
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredBooks.map((book, i) => (
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
          )}
        </div>
      ) : (
        <>
          <section className="mb-4">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                New Arrivals
              </h2>
              <Badge
                variant="outline"
                className="text-[10px] border-primary/30 text-primary"
              >
                {newBooks.length} books
              </Badge>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-3 px-4 pb-2">
                {newBooks.map((book, i) => (
                  <BookCardCompact
                    key={book.id}
                    book={book}
                    userLibrary={userLibrary}
                    onRead={onRead}
                    onAddToLibrary={onAddToLibrary}
                    index={i + 1}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>

          <section className="mb-4 px-4">
            <h2 className="font-display text-base font-semibold text-foreground mb-3">
              Browse by Category
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => onCategorySelect(cat.name)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                  data-ocid={`home.${cat.name.toLowerCase()}.button`}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-[10px] text-muted-foreground font-medium text-center leading-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="px-4">
            <h2 className="font-display text-base font-semibold text-foreground mb-3">
              Popular Books
            </h2>
            <div className="flex flex-col gap-3">
              {books.slice(0, 8).map((book, i) => (
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
          </section>
        </>
      )}
    </div>
  );
}
