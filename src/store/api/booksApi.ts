import { ToastMessagesEnum, type Book, type BookDetails, type GoogleBooksAccessType } from '@/common/types/types';
import { transformGoogleBook, transformGoogleBookDetails } from '@/store/api/transformGoogleResponse';
import { toast } from 'react-toastify';

const API_KEY = "AIzaSyCbFKWXOxJ_5dxPSlp1AvOjG2Z-9cniuXA";

export const fetchBooks = async (
    query: string, filter?: GoogleBooksAccessType, startIndex: number = 0, maxResults: number = 10
): Promise<{ items: Book[]; totalItems: number }> => {
    let url = `https://www.googleapis.com/books/v1/volumes?startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;

    if (filter) {
        url += `&filter=${filter}`;
    }

    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    } else {
        url += "&q=Harry Potter";
    }

    const response = await fetch(url);
    if (!response.ok) {
        toast.error(ToastMessagesEnum.ERROR_API);
        throw new Error('Ошибка загрузки книг');
    }
    const data = await response.json();

    return {
        items: data.items?.map(transformGoogleBook) || [],
        totalItems: data.totalItems || 0
    };
};

export const fetchBookDetails = async (id: string): Promise<BookDetails> => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
    );

    if (!response.ok) {
        toast.error(ToastMessagesEnum.ERROR_API);
        throw new Error('Ошибка загрузки книги');
    }
    const data = await response.json();
    return transformGoogleBookDetails(data);
};

const bookCache = new Map<string, Book>();

export const fetchFavoriteBooks = async (ids: string[]): Promise<Book[]> => {
    if (!ids.length) return [];

    try {
        const uncachedIds = ids.filter(id => !bookCache.has(id));
        const promises = uncachedIds.map(id =>
            fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`Ошибка, статус: ${res.status}`);
                    const data = await res.json();
                    return transformGoogleBook(data);
                })
                .then(book => {
                    bookCache.set(id, book);
                    return book;
                })
        );

        await Promise.all(promises);
        return ids.map(id => bookCache.get(id)).filter(Boolean) as Book[];
    } catch (error) {
        toast.error(ToastMessagesEnum.ERROR_API);
        return [];
    }
};