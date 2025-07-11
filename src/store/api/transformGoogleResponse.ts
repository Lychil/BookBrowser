import type { Book, BookDetails } from "@/common/types/types";

export const transformGoogleBook = (googleBook: any): Book => {
    return {
        id: googleBook.id,
        title: googleBook.volumeInfo?.title || 'Без названия',
        author: googleBook.volumeInfo?.authors?.join(', ') || 'Автор не найден',
        description: googleBook.volumeInfo?.description || 'Описание отсутствует'
    };
};

export const transformGoogleBookDetails = (googleBook: any): BookDetails => {
    return {
        title: googleBook.volumeInfo?.title || 'Без названия',
        author: googleBook.volumeInfo?.authors?.join(', ') || 'Автор не найден.',
        description: googleBook.volumeInfo?.description || 'Описание отсутствует',
        publishDate: googleBook.volumeInfo?.publishedDate || 'Дата не найдена',
        pageCount: googleBook.volumeInfo?.pageCount
            ? `${googleBook.volumeInfo.pageCount} стр.`
            : 'Информация не найдена.'
    };
};