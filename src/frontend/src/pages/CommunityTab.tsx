import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Send, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StarRating } from "../components/StarRating";
import type { Book, Review } from "../types";
import { formatDate } from "../utils/time";

function getAvg(bookId: string, reviews: Review[]) {
  const br = reviews.filter((r) => r.bookId === bookId);
  if (!br.length) return 0;
  return br.reduce((s, r) => s + r.rating, 0) / br.length;
}

interface CommunityTabProps {
  books: Book[];
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "createdAt">) => void;
}

export function CommunityTab({
  books,
  reviews,
  onAddReview,
}: CommunityTabProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  function handleSubmit() {
    if (!selectedBook || !reviewText.trim()) return;
    onAddReview({
      bookId: selectedBook.id,
      reviewer: reviewerName.trim() || "Anonymous Reader",
      rating,
      text: reviewText.trim(),
    });
    toast.success("Review submitted!");
    setShowForm(false);
    setReviewText("");
    setReviewerName("");
    setRating(5);
  }

  if (selectedBook) {
    const avg = getAvg(selectedBook.id, reviews);
    const bookReviews = reviews.filter((r) => r.bookId === selectedBook.id);
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setSelectedBook(null)}
            data-ocid="community.back_button"
          >
            <ArrowLeft size={18} />
          </Button>
          <div
            className="w-10 h-14 rounded-lg flex-shrink-0"
            style={{ backgroundColor: selectedBook.coverColor }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-sm font-semibold text-foreground line-clamp-1">
              {selectedBook.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {selectedBook.author}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={avg} size={12} />
              <span className="text-xs text-muted-foreground">
                {avg > 0 ? avg.toFixed(1) : "No ratings"} · {bookReviews.length}{" "}
                review{bookReviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
            onClick={() => setShowForm(true)}
            data-ocid="community.write_review.button"
          >
            <Star size={12} className="mr-1" />
            Review
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {bookReviews.length === 0 ? (
            <div
              className="py-16 text-center"
              data-ocid="community.empty_state"
            >
              <MessageSquare
                size={36}
                className="text-muted-foreground/40 mx-auto mb-3"
              />
              <p className="text-muted-foreground text-sm">
                No reviews yet. Be the first!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bookReviews.map((review, i) => (
                <div
                  key={review.id}
                  className="p-4"
                  data-ocid={`community.review.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {review.reviewer}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <StarRating rating={review.rating} size={13} />
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent
            className="bg-card border-border text-foreground max-w-sm mx-4"
            data-ocid="community.review.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">Write a Review</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Your Name (optional)
                </p>
                <input
                  type="text"
                  placeholder="Anonymous Reader"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="community.reviewer_name.input"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Your Rating
                </p>
                <StarRating
                  rating={rating}
                  size={24}
                  interactive
                  onChange={setRating}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Your Review
                </p>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-[100px] resize-none"
                  data-ocid="community.review.textarea"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!reviewText.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="community.review.submit_button"
              >
                <Send size={14} className="mr-2" />
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-display text-base font-semibold text-foreground mb-4">
        Community Reviews
      </h2>
      <div className="flex flex-col gap-3">
        {books.map((book, i) => {
          const avg = getAvg(book.id, reviews);
          const count = reviews.filter((r) => r.bookId === book.id).length;
          return (
            <button
              type="button"
              key={book.id}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors text-left"
              onClick={() => setSelectedBook(book)}
              data-ocid={`community.book.item.${i + 1}`}
            >
              <div
                className="w-12 h-16 rounded-lg flex-shrink-0"
                style={{ backgroundColor: book.coverColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground line-clamp-1">
                  {book.title}
                </p>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={avg} size={12} />
                  <span className="text-[10px] text-muted-foreground">
                    {avg > 0 ? avg.toFixed(1) : "No ratings"} · {count} review
                    {count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <MessageSquare
                size={16}
                className="text-muted-foreground flex-shrink-0"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
