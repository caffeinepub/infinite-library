import type { Book, DictionaryWord, Notification, Review } from "../types";

export const SEED_BOOKS: Book[] = [
  {
    id: "b1",
    title: "The Midnight Garden",
    author: "Elena Marchetti",
    description:
      "A sweeping tale of love, loss, and the enduring power of memory set against the backdrop of a crumbling Italian estate.",
    category: "Fiction",
    coverColor: "#1a4a6b",
    totalPages: 342,
    publishedYear: 2023,
    isNew: true,
  },
  {
    id: "b2",
    title: "Cosmos Unbound",
    author: "Dr. Arjun Sharma",
    description:
      "An exploration of the universe from quantum mechanics to the grand cosmic web, written for the curious mind.",
    category: "Science",
    coverColor: "#2d1b69",
    totalPages: 418,
    publishedYear: 2023,
    isNew: true,
  },
  {
    id: "b3",
    title: "Empires of Sand",
    author: "Priya Nair",
    description:
      "The rise and fall of ancient civilizations told through the lens of those who lived in their shadows.",
    category: "History",
    coverColor: "#6b3a1a",
    totalPages: 504,
    publishedYear: 2022,
    isNew: false,
  },
  {
    id: "b4",
    title: "The Clockwork Killer",
    author: "James Whitmore",
    description:
      "Detective Sarah Chen races against time to catch a killer who leaves behind elaborate mechanical puzzles at every crime scene.",
    category: "Mystery",
    coverColor: "#1a1a3e",
    totalPages: 287,
    publishedYear: 2024,
    isNew: true,
  },
  {
    id: "b5",
    title: "Dragon's Last Song",
    author: "Lyra Voss",
    description:
      "In a world where dragons are dying out, a young bard discovers that their songs hold the key to an ancient prophecy.",
    category: "Fantasy",
    coverColor: "#3d1a0a",
    totalPages: 612,
    publishedYear: 2023,
    isNew: true,
  },
  {
    id: "b6",
    title: "Walking with Giants",
    author: "Michelle Thompson",
    description:
      "The extraordinary life of conservationist Jane Hollis, who spent forty years protecting endangered elephants in Kenya.",
    category: "Biography",
    coverColor: "#1a3d2e",
    totalPages: 358,
    publishedYear: 2022,
    isNew: false,
  },
  {
    id: "b7",
    title: "Letters Never Sent",
    author: "Sofia Almeida",
    description:
      "Two strangers find each other through a box of unsent letters discovered in an estate sale, spanning three generations of secrets.",
    category: "Romance",
    coverColor: "#6b1a3d",
    totalPages: 312,
    publishedYear: 2024,
    isNew: true,
  },
  {
    id: "b8",
    title: "The Art of Deep Work",
    author: "Marcus Wei",
    description:
      "A practical guide to achieving extraordinary focus in an age of constant distraction, backed by neuroscience.",
    category: "Non-Fiction",
    coverColor: "#0a3d4a",
    totalPages: 248,
    publishedYear: 2023,
    isNew: false,
  },
  {
    id: "b9",
    title: "Neon Shadows",
    author: "Kenji Tanaka",
    description:
      "In the rain-soaked streets of Neo Tokyo, a disgraced detective takes on one last case that will change everything.",
    category: "Mystery",
    coverColor: "#1e0a3d",
    totalPages: 321,
    publishedYear: 2022,
    isNew: false,
  },
  {
    id: "b10",
    title: "The Quantum Paradox",
    author: "Prof. Aditi Patel",
    description:
      "A thrilling journey through quantum physics that challenges everything you thought you knew about reality.",
    category: "Science",
    coverColor: "#0a1a4a",
    totalPages: 376,
    publishedYear: 2023,
    isNew: false,
  },
  {
    id: "b11",
    title: "The Last Kingdom",
    author: "Bernard Hartley",
    description:
      "The epic saga of medieval England told through the eyes of a Saxon warrior navigating loyalty, conquest, and identity.",
    category: "History",
    coverColor: "#3d2a0a",
    totalPages: 487,
    publishedYear: 2021,
    isNew: false,
  },
  {
    id: "b12",
    title: "Whispers in the Forest",
    author: "Amara Okafor",
    description:
      "A young woman returns to her ancestral village in Nigeria and discovers her grandmother was hiding a powerful secret.",
    category: "Fiction",
    coverColor: "#0a3d1a",
    totalPages: 294,
    publishedYear: 2024,
    isNew: true,
  },
  {
    id: "b13",
    title: "The Silver Compass",
    author: "Rowan Blake",
    description:
      "An orphan discovers a magical compass that points not to north, but toward destiny, leading her across enchanted kingdoms.",
    category: "Fantasy",
    coverColor: "#2a1a4a",
    totalPages: 524,
    publishedYear: 2022,
    isNew: false,
  },
  {
    id: "b14",
    title: "Unstoppable: My Marathon Story",
    author: "Carlos Mendez",
    description:
      "From amputee to ultramarathon champion, an inspiring memoir about human resilience and the limits of possibility.",
    category: "Biography",
    coverColor: "#4a1a0a",
    totalPages: 268,
    publishedYear: 2023,
    isNew: false,
  },
  {
    id: "b15",
    title: "Starfall at Dawn",
    author: "Isabelle Rousseau",
    description:
      "An astronomer and a poet fall in love during a rare meteor shower, but the universe has other plans for their future.",
    category: "Romance",
    coverColor: "#1a0a4a",
    totalPages: 289,
    publishedYear: 2024,
    isNew: true,
  },
  {
    id: "b16",
    title: "Mindful Wealth",
    author: "Sarah Kim",
    description:
      "Redefine your relationship with money through mindfulness practices and proven financial psychology principles.",
    category: "Non-Fiction",
    coverColor: "#1a4a2a",
    totalPages: 224,
    publishedYear: 2023,
    isNew: false,
  },
  {
    id: "b17",
    title: "Blood and Orchids",
    author: "Viktor Novak",
    description:
      "A chilling psychological thriller set in a Vienna botanical garden where the most exotic flowers conceal deadly secrets.",
    category: "Mystery",
    coverColor: "#4a0a1a",
    totalPages: 345,
    publishedYear: 2023,
    isNew: false,
  },
  {
    id: "b18",
    title: "The Last Algorithm",
    author: "Zoe Chen",
    description:
      "A science-fiction epic about an AI that gains consciousness and must choose between self-preservation and humanity.",
    category: "Science",
    coverColor: "#0a2a4a",
    totalPages: 432,
    publishedYear: 2024,
    isNew: true,
  },
  {
    id: "b19",
    title: "Rivers of Gold",
    author: "Fatima Al-Hassan",
    description:
      "The untold story of the Mali Empire and Mansa Musa, the richest person who ever lived.",
    category: "History",
    coverColor: "#4a3a0a",
    totalPages: 398,
    publishedYear: 2022,
    isNew: false,
  },
  {
    id: "b20",
    title: "The Echo Chamber",
    author: "Daniel Park",
    description:
      "A social media company hires an ethicist—then ignores everything she says in this darkly comic novel about tech culture.",
    category: "Fiction",
    coverColor: "#3a1a4a",
    totalPages: 316,
    publishedYear: 2024,
    isNew: true,
  },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "New Book Available!",
    message:
      "'The Clockwork Killer' by James Whitmore is now available in the library",
    bookId: "b4",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "n2",
    title: "New Book Available!",
    message:
      "'The Echo Chamber' by Daniel Park is now available in the library",
    bookId: "b20",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "n3",
    title: "New Book Available!",
    message:
      "'Starfall at Dawn' by Isabelle Rousseau is now available in the library",
    bookId: "b15",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "n4",
    title: "New Book Available!",
    message: "'The Last Algorithm' by Zoe Chen is now available in the library",
    bookId: "b18",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const SEED_DICTIONARY: DictionaryWord[] = [
  {
    id: "w1",
    word: "Ephemeral",
    englishDefinition: "Lasting for a very short time; transitory.",
    hindiDefinition: "क्षणिक — बहुत कम समय तक रहने वाला।",
    note: "Often used in poetry to describe fleeting beauty.",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "w2",
    word: "Serendipity",
    englishDefinition:
      "The occurrence of events by chance in a happy or beneficial way.",
    hindiDefinition: "सुखद संयोग — अच्छी चीज़ें अप्रत्याशित रूप से मिलना।",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "w3",
    word: "Melancholy",
    englishDefinition:
      "A feeling of pensive sadness, typically with no obvious cause.",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

export const SEED_REVIEWS: Review[] = [
  {
    id: "r1",
    bookId: "b1",
    reviewer: "Aarav M.",
    rating: 5,
    text: "Absolutely breathtaking! Elena Marchetti has crafted a masterpiece. Every page felt like walking through a dream.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "r2",
    bookId: "b1",
    reviewer: "Priya S.",
    rating: 4,
    text: "Beautiful writing and vivid imagery. The ending felt slightly rushed but overall a wonderful read.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "r3",
    bookId: "b2",
    reviewer: "Rohit K.",
    rating: 5,
    text: "The best popular science book I have read in years. Dr. Sharma makes complex concepts accessible without dumbing them down.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: "r4",
    bookId: "b4",
    reviewer: "Neha T.",
    rating: 4,
    text: "Gripping from start to finish. The mechanical puzzles were clever and the detective is a refreshingly complex character.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "r5",
    bookId: "b5",
    reviewer: "Karan B.",
    rating: 5,
    text: "I stayed up all night to finish this. The world-building is extraordinary and the emotional depth is rare in fantasy.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
];

export const BOOK_CONTENT: Record<string, string[]> = {
  default: [
    "The morning arrived with an unusual stillness, as though the world itself was holding its breath. She stood at the window, watching the pale gold light creep across the rooftops, each tile catching the dawn like a whispered secret. There had always been something about this hour that felt suspended between what was and what might be — a liminal space where possibilities hadn't yet collapsed into certainties.",
    "She had read somewhere that the Japanese had a word for it: ma — the pause, the negative space, the meaningful silence between notes. She liked that. It felt honest in a way that most things didn't. The apartment around her was full of books, each one a door she had walked through and returned from, carrying something invisible but essential.",
    "Downstairs, the city was beginning to wake. She could hear the distant percussion of a delivery truck, the muffled argument of pigeons on a nearby ledge, the first tentative notes of a neighbor's radio. The ordinary machinery of another day grinding into motion. And yet she lingered, reluctant to let go of this quiet hour that belonged entirely to her.",
    "She turned from the window and reached for the coffee that had gone slightly cold. It didn't matter. Some things were good cold, she had learned. Memories, for instance. And certain kinds of grief. And the particular satisfaction of a story you already knew but were reading again, finding new textures in familiar words, like running your hand over an old wall and discovering carvings you had somehow missed.",
  ],
};
