import styles from './Palette.module.css'

type PaletteProps = {
    onPickColor: (color: string) => void
}

function Palette({ onPickColor }: PaletteProps) {
    return(
        <div className={styles.palette}>
            <div className={styles.paletteMain}>
                <div 
                    className={styles.color + ' ' + styles.red} onClick={() => onPickColor('red')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.orange} onClick={() => onPickColor('orange')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.yellow} onClick={() => onPickColor('yellow')}>    
                </div>
                <div 
                    className={styles.color + ' ' + styles.green} onClick={() => onPickColor('green')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.lightBlue} onClick={() => onPickColor('lightblue')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.blue} onClick={() => onPickColor('blue')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.purple} onClick={() => onPickColor('purple')}>
                </div>
                <div 
                    className={styles.color + ' ' + styles.black} onClick={() => onPickColor('black')}>
                </div>
            </div>
            <input type="color" className={styles.colorPicker} onChange={(event) => onPickColor(event.target.value)} />
        </div>
    )
}

export {
    Palette
}