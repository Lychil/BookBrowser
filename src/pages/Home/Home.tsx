import SearchInput from "@/common/components/SearchInput/SearchInput";
import styles from "@/pages/Home/Home.module.css";

export default function Home() {
    return (
        <div className={styles.home__wrapper}>
            <SearchInput />
        </div>
    )
}
