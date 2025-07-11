export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
}

export interface BookDetails {
    title: string;
    author: string;
    description: string;
    publishDate: string;
    pageCount: string;
}

export interface BooksState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

export type BooksAction =
    | { type: 'FETCH_BOOKS_REQUEST' }
    | { type: 'FETCH_BOOKS_SUCCESS'; payload: Book[] }
    | { type: 'FETCH_BOOKS_FAILURE'; payload: string }
    | { type: 'SELECT_BOOK'; payload: Book }
    | { type: 'ADD_BOOK'; payload: Book }
    | { type: 'REMOVE_BOOK'; payload: string }
    | { type: 'UPDATE_BOOK'; payload: Book }
    | { type: 'CLEAR_BOOKS' }