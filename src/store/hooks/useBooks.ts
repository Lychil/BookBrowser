import { useCallback, useReducer } from "react";
import { fetchBooks as apiFetchBooks } from "@/store/api/booksApi";
import type { BooksState, BooksAction, GoogleBooksAccessType } from "@/common/types/types";

const initialState: BooksState = {
    books: [],
    filteredBooks: [],
    loading: false,
    error: null,
    filters: {
        q: 'Harry Potter',
        filter: undefined
    }
};

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                loading: false,
                books: action.payload,
                filteredBooks: action.payload
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
            return { ...state, loading: true };

        default:
            return state;
    }
};

const useBooksReducer = () => {
    const [state, dispatch] = useReducer(booksReducer, initialState);

    const fetchBooks = useCallback(async (query: string, filter?: GoogleBooksAccessType) => {
        dispatch({ type: 'APPLY_FILTERS' });
        dispatch({ type: 'FETCH_BOOKS_REQUEST' });
        try {
            const books = await apiFetchBooks(query, filter);
            dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: books });
        } catch (error) {
            dispatch({
                type: 'FETCH_BOOKS_FAILURE',
                payload: error instanceof Error ? error.message : 'Ошибка загрузки'
            });
        }
    }, []);

    const setSearchQuery = useCallback((query: string) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    }, []);

    const setFilterType = useCallback((filterType: GoogleBooksAccessType | undefined) => {
        dispatch({ type: 'SET_FILTER_TYPE', payload: filterType });
    }, []);

    return {
        state,
        fetchBooks,
        setSearchQuery,
        setFilterType
    };
};

export default useBooksReducer;