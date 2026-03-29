import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookMarked, BookOpen, Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Book, UserLibrary } from "../types";

interface BookCardProps {
  book: Book;
  userLibrary: UserLibrary;
  onRead: (book: Book) => void;
  onAddToLibrary: (bookId: string) => void;
  index?: number;
}

export function BookCard({
  book,
  userLibrary,
  onRead,
  onAddToLibrary,
  index = 1,
}: BookCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!book.coverImage && !imgError;
  const isInLibrary = !!userLibrary[book.id];

  return (
    <div
      className="bg-card rounded-xl overflow-hidden flex gap-3 p-3"
      style={{ borderLeft: `4px solid ${book.coverColor}` }}
      data-ocid={`books.item.${index}`}
    >
      <div
        className="w-16 h-24 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: book.coverColor }}
      >
        {showImage ? (
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            <BookOpen size={22} className="text-white/50" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute top-1.5 left-2 right-2 h-[2px] rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
            />
            <span
              className="absolute bottom-1 left-0 right-0 text-center text-white/80 text-[9px] font-bold px-1 leading-tight"
              style={{ fontFamily: "serif" }}
            >
              {book.title.slice(0, 12)}
            </span>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {book.author}
            </p>
          </div>
          {book.isNew && (
            <Badge className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-primary/30 flex-shrink-0">
              New
            </Badge>
          )}
        </div>
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 mt-1 border-border text-muted-foreground"
        >
          {book.category}
        </Badge>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
          {book.description}
        </p>
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            className="h-7 text-xs px-3 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => onRead(book)}
            data-ocid={`books.primary_button.${index}`}
          >
            <BookOpen size={12} className="mr-1" />
            Read
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`h-7 text-xs px-3 border-border ${
              isInLibrary
                ? "text-primary border-primary/50 bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onAddToLibrary(book.id)}
            data-ocid={`books.secondary_button.${index}`}
          >
            {isInLibrary ? (
              <>
                <Check size={12} className="mr-1" />
                Saved
              </>
            ) : (
              <>
                <Plus size={12} className="mr-1" />
                Library
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BookCardCompact({
  book,
  onRead,
  index = 1,
}: {
  book: Book;
  userLibrary: UserLibrary;
  onRead: (b: Book) => void;
  onAddToLibrary: (id: string) => void;
  index?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!book.coverImage && !imgError;

  return (
    <div className="flex-shrink-0 w-36" data-ocid={`books.card.${index}`}>
      <button
        type="button"
        className="w-full h-48 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer"
        style={{ backgroundColor: book.coverColor }}
        onClick={() => onRead(book)}
      >
        {showImage ? (
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
              }}
            />
            <BookMarked size={30} className="text-white/40" />
          </>
        )}
        {book.isNew && (
          <div className="absolute top-2 right-2">
            <Badge className="text-[9px] px-1.5 py-0 bg-primary text-primary-foreground">
              New
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2">
            {book.title}
          </p>
          <p className="text-white/60 text-[10px] mt-0.5">{book.author}</p>
        </div>
      </button>
    </div>
  );
}
