import React from 'react';
import styles from '@/pages/Book/Book.module.css';
import BookInfo from '@/common/components/BookInfo/BookInfo';
import BookMetaData from '@/common/components/BookMetaData/BookMetaData';

type BookProps = {
    coverUrl?: string;
    title: string;
    author: string;
    publishDate: string;
    pageCount: number;
    description: string;
};

export const Book: React.FC<BookProps> = ({
    coverUrl,
    title,
    author,
    publishDate,
    pageCount,
    description
}) => {
    return (
        <div className={styles.bookContainer}>
            <div className={styles.topSection}>
                {/* <div className={styles.coverWrapper}>
                    <img
                        src={coverUrl}
                        alt={`Обложка книги "${title}"`}
                        className={styles.cover}
                    />
                </div> */}
                <div className={styles.placeholder}></div>
                <BookInfo {...{ title, description, author }} />
            </div>
            <BookMetaData {...{ publishDate, pageCount }} />
        </div>
    );
};