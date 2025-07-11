import type { BooksState, BooksAction, Book } from "@/common/types/types";
import { useReducer } from "react";
import { fetchBooks as apiFetchBooks } from "@/store/api/booksApi";

const initialState: BooksState = {
    books: [],
    loading: false,
    error: null
};

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return { ...state, loading: true, error: null };

        case 'FETCH_BOOKS_SUCCESS':
            return { ...state, loading: false, books: action.payload };

        case 'FETCH_BOOKS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload]
            };

        case 'REMOVE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            };

        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map(book =>
                    book.id === action.payload.id ? action.payload : book
                )
            };

        case 'CLEAR_BOOKS':
            return { ...state, books: [] };

        default:
            return state;
    }
};

const useBooksReducer = () => {
    const [state, dispatch] = useReducer(booksReducer, initialState);

    const fetchBooks = async (query: string = "Harry Potter") => {
        dispatch({ type: 'FETCH_BOOKS_REQUEST' });
        try {
            const books = await apiFetchBooks(query);
            dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: books });
        } catch (error) {
            dispatch({
                type: 'FETCH_BOOKS_FAILURE',
                payload: error instanceof Error ? error.message : 'Ошибка загрузки'
            });
        }
    };

    const addBook = (book: Book) => {
        dispatch({ type: 'ADD_BOOK', payload: book });
    };

    const removeBook = (id: string) => {
        dispatch({ type: 'REMOVE_BOOK', payload: id });
    };

    const updateBook = (book: Book) => {
        dispatch({ type: 'UPDATE_BOOK', payload: book });
    };

    const clearBooks = () => {
        dispatch({ type: 'CLEAR_BOOKS' });
    };

    return {
        state,
        fetchBooks,
        addBook,
        removeBook,
        updateBook,
        clearBooks
    };
};

export default useBooksReducer;