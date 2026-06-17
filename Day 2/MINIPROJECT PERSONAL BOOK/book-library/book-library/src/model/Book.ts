export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  isRead: boolean;
  rating: number;
  dateAdded: string;
  coverUrl?: string;
}

export class BookItem implements Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  isRead: boolean;
  rating: number;
  dateAdded: string;
  coverUrl?: string;

  constructor(data: Partial<Book> = {}) {
    this.id = data.id ?? crypto.randomUUID();
    this.title = data.title ?? '';
    this.author = data.author ?? '';
    this.description = data.description ?? '';
    this.category = data.category ?? 'Uncategorized';
    this.isRead = data.isRead ?? false;
    this.rating = data.rating ?? 0;
    this.dateAdded = data.dateAdded ?? new Date().toISOString();
    this.coverUrl = data.coverUrl;
  }

  get displayTitle(): string {
    return this.title.trim() || 'Untitled Book';
  }

  get displayAuthor(): string {
    return this.author.trim() || 'Unknown Author';
  }

  get formattedDate(): string {
    return new Date(this.dateAdded).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  get readStatusText(): string {
    return this.isRead ? 'Read' : 'Unread';
  }

  toggleRead(): BookItem {
    return new BookItem({ ...this, isRead: !this.isRead });
  }

  setRating(rating: number): BookItem {
    return new BookItem({ ...this, rating: Math.max(0, Math.min(5, rating)) });
  }

  toJSON(): Book {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      description: this.description,
      category: this.category,
      isRead: this.isRead,
      rating: this.rating,
      dateAdded: this.dateAdded,
      coverUrl: this.coverUrl,
    };
  }

  static fromJSON(json: Book): BookItem {
    return new BookItem(json);
  }

  static create(props: Omit<Book, 'id' | 'dateAdded'>): BookItem {
    return new BookItem({
      ...props,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    });
  }
}

export type BookFilter = 'all' | 'read' | 'unread';
export type SortField = 'title' | 'author' | 'dateAdded' | 'rating';
export type SortDirection = 'asc' | 'desc';
