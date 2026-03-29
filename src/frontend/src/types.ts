export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  coverColor: string;
  totalPages: number;
  publishedYear: number;
  isNew: boolean;
  gutenbergId?: number;
  textUrl?: string;
  coverImage?: string;
}

export interface UserLibrary {
  [bookId: string]: "library" | "reading_list" | "read";
}

export interface ReadingProgress {
  [bookId: string]: number;
}

export interface DictionaryWord {
  id: string;
  word: string;
  englishDefinition: string;
  hindiDefinition?: string;
  note?: string;
  addedAt: string;
}

export interface Review {
  id: string;
  bookId: string;
  reviewer: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  bookId: string;
  isRead: boolean;
  timestamp: string;
}

export interface ReaderSettings {
  fontSize: number;
  fontFamily: "serif" | "sans-serif" | "monospace";
  lineHeight: number;
  theme: "dark" | "sepia" | "white";
}

export type TabName =
  | "home"
  | "categories"
  | "library"
  | "community"
  | "dictionary";
