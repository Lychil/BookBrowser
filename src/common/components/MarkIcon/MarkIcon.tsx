import styles from "@/common/components/MarkIcon/MarkIcon.module.css";
import markImg from "@/common/img/icons/mark.svg";

export default function MarkIcon() {
    return (
        <div className={styles.mark}>
            <img src={markImg} alt="Значек закладки" />
        </div>
    )
}
