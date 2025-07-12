import type { BooksState, BooksAction } from "@/common/types/types";

export const initialState: BooksState = {
    books: [],
    filteredBooks: [],
    loading: false,
    error: null,
    filters: {
        q: 'Harry Potter',
        filter: undefined
    },
    pagination: {
        currentPage: 0,
        totalItems: 0,
        maxResults: 10,
        hasMore: true
    }
};

export const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                loading: false,
                books: action.payload.books,
                filteredBooks: action.payload.books,
                pagination: {
                    ...state.pagination,
                    currentPage: 0,
                    totalItems: action.payload.totalItems,
                    hasMore: action.payload.books.length < action.payload.totalItems
                }
            };

        case 'FETCH_BOOKS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    q: action.payload
                }
            };

        case 'SET_FILTER_TYPE':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    filter: action.payload
                }
            };

        case 'APPLY_FILTERS':
            return {
                ...state,
                loading: true,
                pagination: {
                    ...state.pagination,
                    currentPage: 0
                }
            };

        case 'LOAD_MORE_BOOKS_REQUEST':
            return { ...state, loading: true };

        case 'LOAD_MORE_BOOKS_SUCCESS':
            return {
                ...state,
                loading: false,
                books: [...state.books, ...action.payload.books],
                filteredBooks: [...state.filteredBooks, ...action.payload.books],
                pagination: {
                    ...state.pagination,
                    currentPage: state.pagination.currentPage + 1,
                    totalItems: action.payload.totalItems,
                    hasMore: (state.books.length + action.payload.books.length) < action.payload.totalItems
                }
            };

        case 'RESET_PAGINATION':
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: 0,
                    hasMore: true
                }
            };

        default:
            return state;
    }
};