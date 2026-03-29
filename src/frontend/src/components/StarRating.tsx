import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const positions = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className="flex gap-0.5">
      {positions.map((pos) => (
        <button
          key={`star-pos-${pos}`}
          type="button"
          onClick={() => interactive && onChange?.(pos)}
          className={
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : "cursor-default"
          }
          aria-label={interactive ? `Rate ${pos} stars` : undefined}
        >
          <Star
            size={size}
            className={
              pos <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}
