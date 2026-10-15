import styles from './palette.module.css'

function Palette() {
    return(
        <div className={styles.palette}>
            <div className={styles.color + ' ' + styles.red}></div>
            <div className={styles.color + ' ' + styles.orange}></div>
            <div className={styles.color + ' ' + styles.yellow}></div>
            <div className={styles.color + ' ' + styles.green}></div>
            <div className={styles.color + ' ' + styles.lightBlue}></div>
            <div className={styles.color + ' ' + styles.blue}></div>
            <div className={styles.color + ' ' + styles.purple}></div>
        </div>
    )
}

export {
    Palette
}