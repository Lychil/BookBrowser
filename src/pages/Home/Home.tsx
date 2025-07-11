import BookCard from "@/common/components/BookCard/BookCard";
import SearchInput from "@/common/components/SearchInput/SearchInput";
import SortDropdown from "@/common/components/SortDropdown/SortDropdown";
import styles from "@/pages/Home/Home.module.css";

const book = { coverUrl: "", title: "1984 Ешенавп вапавпав", author: "Jeorge Oruell", description: "gdfgj fhkjfdg fdghdfkg dfgjdf hgkfdgh d hfdjkgh hdfdjgh dkfjgh dfkjg hdfjghfd khgjkd gdg hdkfdgh khfdkgh dgkdfg kdhfdk dkdfgdhkghdf hdfghdfgkd dhfgkfdg dkfhg d" };

export default function Home() {
    return (
        <div className={styles.home__wrapper}>
            <div className={styles.home__filters}>
                <SearchInput />
                <SortDropdown />
            </div>
            <div className={styles.home__books}>
                {[...Array(10).keys()].map((key) => <BookCard key={key} {...book} />)}
            </div>
        </div>
    )
}
