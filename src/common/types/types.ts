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
    pagination: {
        currentPage: number;
        totalItems: number;
        maxResults: number;
        hasMore: boolean;
    };
}

export type BooksAction =
    | { type: 'FETCH_BOOKS_REQUEST' }
    | { type: 'FETCH_BOOKS_SUCCESS'; payload: { books: Book[]; totalItems: number } }
    | { type: 'FETCH_BOOKS_FAILURE'; payload: string }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_FILTER_TYPE'; payload: GoogleBooksAccessType | undefined }
    | { type: 'APPLY_FILTERS' }
    | { type: 'LOAD_MORE_BOOKS_REQUEST' }
    | { type: 'LOAD_MORE_BOOKS_SUCCESS'; payload: { books: Book[]; totalItems: number } }
    | { type: 'RESET_PAGINATION' };