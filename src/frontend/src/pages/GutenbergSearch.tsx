import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, Check, Loader2, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Book } from "../types";

const COVER_COLORS = [
  "#1a4a6b",
  "#2d1b69",
  "#6b3a1a",
  "#1a1a3e",
  "#3d1a0a",
  "#1a3d2e",
  "#6b1a3d",
  "#0a3d4a",
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

interface GutenbergResult {
  id: number;
  title: string;
  authors: Array<{ name: string }>;
  subjects: string[];
  formats: Record<string, string>;
}

function mapSubjectToCategory(subjects: string[]): string {
  const joined = subjects.join(" ").toLowerCase();
  if (joined.includes("fiction")) return "Fiction";
  if (joined.includes("science")) return "Science";
  if (joined.includes("history")) return "History";
  if (joined.includes("mystery") || joined.includes("detective"))
    return "Mystery";
  if (joined.includes("fantasy") || joined.includes("fairy")) return "Fantasy";
  if (joined.includes("biograph")) return "Biography";
  if (joined.includes("romance") || joined.includes("love stories"))
    return "Romance";
  return "Non-Fiction";
}

function randomCoverColor(): string {
  return COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)];
}

function getTextUrl(formats: Record<string, string>): string | null {
  const preferred = [
    "text/plain; charset=utf-8",
    "text/plain; charset=us-ascii",
    "text/plain",
  ];
  for (const key of preferred) {
    if (formats[key]) {
      let url = formats[key];
      if (url.startsWith("http://")) url = url.replace("http://", "https://");
      if (!url.includes("www.gutenberg.org")) {
        url = url.replace("gutenberg.org", "www.gutenberg.org");
      }
      return url;
    }
  }
  return null;
}

interface GutenbergSearchProps {
  existingBooks: Book[];
  onImportBook: (book: Book) => void;
  onClose: () => void;
}

export function GutenbergSearch({
  existingBooks,
  onImportBook,
  onClose,
}: GutenbergSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GutenbergResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [importedIds, setImportedIds] = useState<Set<number>>(new Set());

  const alreadyImportedIds = new Set(
    existingBooks.filter((b) => b.gutenbergId).map((b) => b.gutenbergId!),
  );

  async function handleSearch() {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://gutendex.com/books/?search=${encodeURIComponent(query.trim())}`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImport(result: GutenbergResult) {
    const textUrl = getTextUrl(result.formats);
    let coverImage = result.formats["image/jpeg"] || undefined;
    if (coverImage?.startsWith("http://")) {
      coverImage = coverImage.replace("http://", "https://");
    }
    const book: Book = {
      id: `gutenberg-${result.id}`,
      title: result.title,
      author: result.authors[0]?.name || "Unknown",
      description:
        result.subjects.slice(0, 2).join(", ") ||
        "A classic public domain book.",
      category: mapSubjectToCategory(result.subjects),
      coverColor: randomCoverColor(),
      totalPages: 300,
      publishedYear: 2000,
      isNew: false,
      gutenbergId: result.id,
      textUrl: textUrl || undefined,
      coverImage,
    };
    onImportBook(book);
    setImportedIds((prev) => new Set([...prev, result.id]));
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      data-ocid="gutenberg.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={onClose}
          data-ocid="gutenberg.close_button"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-semibold text-foreground text-base leading-tight">
            Project Gutenberg
          </h1>
          <p className="text-[11px] text-muted-foreground leading-tight">
            70,000+ free public domain books
          </p>
        </div>
        <BookOpen size={20} className="text-primary shrink-0" />
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search classics: Sherlock Holmes, Jane Austen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9 bg-background border-border h-10"
              data-ocid="gutenberg.search_input"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="h-10 px-4 shrink-0"
            data-ocid="gutenberg.search.button"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-3">
          {isLoading ? (
            <div
              className="flex flex-col gap-3"
              data-ocid="gutenberg.loading_state"
            >
              {SKELETON_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  <Skeleton className="w-12 h-16 rounded-lg shrink-0" />
                  <div className="flex-1 flex flex-col gap-2 py-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : !hasSearched ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BookOpen size={28} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-foreground text-lg mb-1">
                  Discover Free Classics
                </p>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Search Project Gutenberg's vast collection of public domain
                  books — from Shakespeare to Sherlock Holmes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {[
                  "Sherlock Holmes",
                  "Jane Austen",
                  "Dracula",
                  "Frankenstein",
                  "Moby Dick",
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 gap-3"
              data-ocid="gutenberg.empty_state"
            >
              <Search size={36} className="text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                No books found for "{query}"
              </p>
              <p className="text-xs text-muted-foreground/60">
                Try a different title or author name
              </p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">
                  {results.length} result{results.length !== 1 ? "s" : ""} for "
                  {query}"
                </p>
                {results.map((result, i) => {
                  const isAlreadyImported = alreadyImportedIds.has(result.id);
                  const justImported = importedIds.has(result.id);
                  const textUrl = getTextUrl(result.formats);
                  const category = mapSubjectToCategory(result.subjects);
                  const coverImageUrl = result.formats["image/jpeg"];

                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex gap-3 p-3 rounded-xl bg-card border border-border"
                      data-ocid={`gutenberg.item.${i + 1}`}
                    >
                      <div
                        className="w-12 h-16 rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor:
                            COVER_COLORS[i % COVER_COLORS.length],
                        }}
                      >
                        {coverImageUrl ? (
                          <img
                            src={coverImageUrl}
                            alt={`${result.title} cover`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen size={18} className="text-white/70" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
                            {result.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {result.authors[0]?.name || "Unknown"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-2 py-0.5 h-auto"
                          >
                            {category}
                          </Badge>
                          {!textUrl ? (
                            <span className="text-[10px] text-muted-foreground/50">
                              No text available
                            </span>
                          ) : isAlreadyImported ? (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-primary/40 text-primary gap-1"
                            >
                              <Check size={10} /> In Library
                            </Badge>
                          ) : justImported ? (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-green-500/40 text-green-400 gap-1"
                            >
                              <Check size={10} /> Imported!
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-3 text-xs border-primary/40 text-primary hover:bg-primary/10"
                              onClick={() => handleImport(result)}
                              data-ocid={`gutenberg.import.button.${i + 1}`}
                            >
                              Import
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
