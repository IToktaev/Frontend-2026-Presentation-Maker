import { useState } from 'react'
import styles from './Palette.module.css'

type PaletteProps = {
    defaultColor?: string
    onPickColor: (color: string) => void
}

function Palette({ defaultColor, onPickColor }: PaletteProps) {
    const [currentColor, setCurrentColor] = useState<string>('')

    const redColor = styles.color + ' ' + styles.red
    const orangeColor = styles.color + ' ' + styles.orange
    const yellowColor = styles.color + ' ' + styles.yellow
    const greenColor = styles.color + ' ' + styles.green
    const lightblueColor = styles.color + ' ' + styles.lightBlue
    const blueColor = styles.color + ' ' + styles.blue
    const purpleColor = styles.color + ' ' + styles.purple
    const blackColor = styles.color + ' ' + styles.black

    return(
        <div className={styles.palette}>
            <div className={styles.paletteMain}>
                <div
                    className={
                        currentColor === 'red' 
                            ? redColor + ' ' + styles.activeColor 
                            : redColor
                    }
                    onClick={() => {onPickColor('red'); setCurrentColor('red')}}>
                </div>
                <div
                    className={
                        currentColor === 'orange' 
                            ? orangeColor + ' ' + styles.activeColor 
                            : orangeColor
                    }
                    onClick={() => {onPickColor('orange'); setCurrentColor('orange')}}>
                </div>
                <div
                    className={
                        currentColor === 'yellow' 
                        ? yellowColor + ' ' + styles.activeColor 
                        : yellowColor
                    }
                    onClick={() => {onPickColor('yellow'); setCurrentColor('yellow')}}>
                </div>
                <div
                    className={
                        currentColor === 'green' 
                        ? greenColor + ' ' + styles.activeColor 
                        : greenColor
                    }
                    onClick={() => {onPickColor('green'); setCurrentColor('green')}}>
                </div>
                <div
                    className={
                        currentColor === 'lightblue' 
                        ? lightblueColor + ' ' + styles.activeColor 
                        : lightblueColor
                    }
                    onClick={() => {onPickColor('lightblue'); setCurrentColor('lightblue')}}>
                </div>
                <div
                    className={
                        currentColor === 'blue' 
                        ? blueColor + ' ' + styles.activeColor 
                        : blueColor
                    }
                    onClick={() => {onPickColor('blue'); setCurrentColor('blue')}}>
                </div>
                <div
                    className={
                        currentColor === 'purple' 
                        ? purpleColor + ' ' + styles.activeColor 
                        : purpleColor
                    }
                    onClick={() => {onPickColor('purple'); setCurrentColor('purple')}}>
                </div>
                <div
                    className={
                        currentColor === 'black' 
                        ? blackColor + ' ' + styles.activeColor 
                        : blackColor
                    }
                    onClick={() => {onPickColor('black'); setCurrentColor('black')}}>
                </div>
            </div>
            <input
                type="color"
                className={styles.colorPicker}
                value={defaultColor}
                onChange={(event) => {
                    onPickColor(event.target.value); 
                    setCurrentColor(event.target.value)
                }}
            />
        </div>
    )
}

export {
    Palette
}