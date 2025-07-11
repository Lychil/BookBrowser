import styles from "@/common/components/BookMetaData/BookMetaData.module.css";

interface BookMetaDataProps {
    publishDate: string;
    pageCount: number;
}

export default function BookMetaData({publishDate, pageCount}: BookMetaDataProps) {
    return (
        <div className={styles.metaData}>
            <h2 className={styles.metaTitle}>Детали</h2>
            <div className={styles.metaItems}>
                <div className={styles.metaItem}>
                    <p className={styles.metaItem__title}>Дата публикации</p>
                    <span>{publishDate}</span>
                </div>
                <div className={styles.metaItem}>
                    <p className={styles.metaItem__title}>Кол-во страниц</p>
                    <span>{pageCount} стр.</span>
                </div>
            </div>
        </div>
    )
}
