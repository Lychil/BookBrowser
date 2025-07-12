import styles from "@/common/components/MarkIcon/MarkIcon.module.css";
import markImg from "@/common/img/icons/mark.svg";
import markActiveImg from "@/common/img/icons/mark-active.svg";

export default function MarkIcon({active = false}: {active?: boolean}) {
    return (
        <div className={styles.mark}>
            <img src={active ? markActiveImg : markImg} style={{fill: "red"}} alt="Значек закладки" />
        </div>
    )
}
