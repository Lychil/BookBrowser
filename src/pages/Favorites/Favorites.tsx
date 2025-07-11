import BackHome from "@/common/components/BackHome/BackHome";
import BookCard from "@/common/components/BookCard/BookCard";
import styles from "@/pages/Favorites/Favorites.module.css";

const book = { coverUrl: "", title: "1984 Ешенавп вапавпав", author: "Jeorge Oruell", description: "gdfgj fhkjfdg fdghdfkg dfgjdf hgkfdgh d hfdjkgh hdfdjgh dkfjgh dfkjg hdfjghfd khgjkd gdg hdkfdgh khfdkgh dgkdfg kdhfdk dkdfgdhkghdf hdfghdfgkd dhfgkfdg dkfhg d" };

export default function Favorites() {
    return (
        <div className={styles.favorites__wrapper}>
            <div style={{marginBottom: "20px"}}>
                <BackHome />
            </div>
            <div className={styles.favorites__books}>
                {[...Array(10).keys()].map((key) => <BookCard key={key} {...book} />)}
            </div>
        </div>
    )
}
