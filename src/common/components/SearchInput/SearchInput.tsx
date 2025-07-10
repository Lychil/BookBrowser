import styles from "@/common/components/SearchInput/SearchInput.module.css";
import searchImg from "@/common/img/icons/search.svg";

export default function SearchInput() {

    return (
        <div className={styles.search__container}>
            <div className={styles.search__wrapper}>
                <img src={searchImg} className={styles.search__icon} alt="Значек поиска" />
                <input
                    type="text"
                    className={styles.search__input}
                    placeholder="Поиск..."
                />
            </div>
        </div>
    )
}
