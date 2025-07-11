import HomeBooks from "@/common/components/HomeBooks/HomeBooks";
import SearchInput from "@/common/components/SearchInput/SearchInput";
import SortDropdown from "@/common/components/SortDropdown/SortDropdown";
import styles from "@/pages/Home/Home.module.css";

export default function Home() {
    return (
        <div className={styles.home__wrapper}>
            <div className={styles.home__filters}>
                <SearchInput />
                <SortDropdown />
            </div>
            <HomeBooks />
        </div>
    )
}
