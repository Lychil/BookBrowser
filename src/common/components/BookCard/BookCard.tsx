import styles from '@/common/components/BookCard/BookCard.module.css';
import { Link } from 'react-router-dom';

type BookCardProps = {
    coverUrl: string;
    title: string;
    author: string;
    description: string;
};

export default function BookCard({ coverUrl, title, author, description }: BookCardProps) {
    return (
        <Link to={""} className={styles.bookCard}>
            <div className={styles.coverContainer}>
                {/* <img
                    src={coverUrl}
                    alt={`Обложка книги "${title}"`}
                    className={styles.coverImage}
                /> */}
                <div className={styles.placeholder}></div>
            </div>

            <div className={styles.bookInfo}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>{author}</p>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};