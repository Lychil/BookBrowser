export type GoogleBooksAccessType = 'ebooks' | 'free-ebooks' | 'full' | 'paid-ebooks' | 'partial';

export interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    description: string;
}

export interface BookDetails {
    title: string;
    author: string;
    coverUrl?: string;
    description: string;
    publishDate: string;
    pageCount: number;
}

export interface BooksState {
    books: Book[];
    filteredBooks: Book[];
    filters: {
        q: string;
        filter: GoogleBooksAccessType | undefined;
    };
    loading: boolean;
    error: string | null;
}

export type BooksAction =
    | { type: 'FETCH_BOOKS_REQUEST' }
    | { type: 'FETCH_BOOKS_SUCCESS'; payload: Book[] }
    | { type: 'FETCH_BOOKS_FAILURE'; payload: string }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'APPLY_FILTERS' };