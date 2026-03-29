import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCheck, BookMarked, Library } from "lucide-react";
import { BookCard } from "../components/BookCard";
import type { Book, UserLibrary } from "../types";

function EmptyState({
  message,
  icon: Icon,
}: { message: string; icon: React.ElementType }) {
  return (
    <div className="py-16 text-center" data-ocid="library.empty_state">
      <Icon size={40} className="text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

export function LibraryTab({
  books,
  userLibrary,
  onRead,
  onAddToLibrary,
}: {
  books: Book[];
  userLibrary: UserLibrary;
  onRead: (b: Book) => void;
  onAddToLibrary: (id: string) => void;
}) {
  const libraryBooks = books.filter((b) => userLibrary[b.id] === "library");
  const readingListBooks = books.filter(
    (b) => userLibrary[b.id] === "reading_list",
  );
  const readBooks = books.filter((b) => userLibrary[b.id] === "read");

  return (
    <Tabs defaultValue="library">
      <TabsList className="w-full bg-card border-b border-border rounded-none h-11 p-0">
        <TabsTrigger
          value="library"
          className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent text-xs"
          data-ocid="library.my_library.tab"
        >
          <Library size={14} className="mr-1" />
          My Library ({libraryBooks.length})
        </TabsTrigger>
        <TabsTrigger
          value="reading_list"
          className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent text-xs"
          data-ocid="library.reading_list.tab"
        >
          <BookMarked size={14} className="mr-1" />
          Reading List ({readingListBooks.length})
        </TabsTrigger>
        <TabsTrigger
          value="read"
          className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent text-xs"
          data-ocid="library.already_read.tab"
        >
          <BookCheck size={14} className="mr-1" />
          Read ({readBooks.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="library" className="p-4 mt-0">
        {libraryBooks.length === 0 ? (
          <EmptyState
            message="Your library is empty. Add books to start collecting!"
            icon={Library}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {libraryBooks.map((b, i) => (
              <BookCard
                key={b.id}
                book={b}
                userLibrary={userLibrary}
                onRead={onRead}
                onAddToLibrary={onAddToLibrary}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="reading_list" className="p-4 mt-0">
        {readingListBooks.length === 0 ? (
          <EmptyState
            message="No books in your reading list yet!"
            icon={BookMarked}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {readingListBooks.map((b, i) => (
              <BookCard
                key={b.id}
                book={b}
                userLibrary={userLibrary}
                onRead={onRead}
                onAddToLibrary={onAddToLibrary}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="read" className="p-4 mt-0">
        {readBooks.length === 0 ? (
          <EmptyState
            message="No books marked as read yet. Finish a book and mark it!"
            icon={BookCheck}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {readBooks.map((b, i) => (
              <BookCard
                key={b.id}
                book={b}
                userLibrary={userLibrary}
                onRead={onRead}
                onAddToLibrary={onAddToLibrary}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
