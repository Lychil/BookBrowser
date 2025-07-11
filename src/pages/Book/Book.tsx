import { useEffect, useState } from 'react';
import styles from '@/pages/Book/Book.module.css';
import BookInfo from '@/common/components/BookInfo/BookInfo';
import BookMetaData from '@/common/components/BookMetaData/BookMetaData';
import BackHome from '@/common/components/BackHome/BackHome';
import type { BookDetails } from '@/common/types/types';
import { fetchBookDetails } from '@/store/api/booksApi';
import { useParams } from 'react-router-dom';

export default function Book() {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, useBook] = useState<BookDetails>();

    useEffect(() => {
        fetchBookDetails(bookId!).then(res => useBook(res));
    }, []);

    return (
        <div className={styles.bookContainer}>
            {book &&
                <>
                    <div style={{ marginBottom: "20px" }}>
                        <BackHome />
                    </div>
                    <div className={styles.topSection}>
                        {book.coverUrl ?
                            <div className={styles.coverWrapper}>
                                <img
                                    src={book.coverUrl}
                                    alt={`Обложка книги "${book.title}"`}
                                    className={styles.cover}
                                />
                            </div>
                            :
                            <div className={styles.placeholder}></div>
                        }
                        <BookInfo title={book.title} description={book.description} author={book.author} />
                    </div>
                    <BookMetaData publishDate={book.publishDate} pageCount={book.pageCount} />
                </>
            }
        </div>
    );
};