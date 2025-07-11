import styles from "@/common/components/BookInfo/BookInfo.module.css";

interface BookInfoProps {
    title: string;
    author: string;
    description: string;
}

export default function BookInfo({title, author, description}: BookInfoProps) {
    return (
        <div className={styles.bookInfo}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.author}>{author}</p>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
