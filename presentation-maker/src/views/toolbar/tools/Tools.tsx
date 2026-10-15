import { Button } from "../../../components/button/Button";
import { TextInput } from "../../../components/textInput/TextInput";

import TextIcon from '../../../assets/text-icon.png'
import ImageIcon from '../../../assets/image-icon.png'
import FigureIcon from '../../../assets/figure-icon.png'

import styles from './tools.module.css'
import { Palette } from "../../palette/Palette";


function Tools() {
    const isPaletteOpen = false;

    return(
       <div className ={styles.toolArea}>
           <div className={styles.tools + ' ' + styles.toolsTop}>
                <h3 className={styles.toolName}>Инструменты</h3>
                <Button className={styles.icon}><img src={TextIcon} /></Button>
                <Button className={styles.icon}><img src={ImageIcon} /></Button>
                <Button className={styles.icon}><img src={FigureIcon} /></Button>
            </div>
                
            <div className={styles.tools + ' ' + styles.toolsBottom}>
                <select className={styles.fontFamily}>
                    <option>Arial</option>
                    <option>Times New Roman</option>
                    <option>Sans-Serif</option>
                </select>
                <TextInput 
                    className={styles.fontSize}
                    type="number"
                    defaultValue={8}
                    min={8}
                    max={100}
                />
                <Button className={styles.fontStyleIcon + ' ' + styles.activeFontIcon}>
                    <u>u</u>
                </Button>
                <Button className={styles.fontStyleIcon}><b>b</b></Button>
                <Button className={styles.fontStyleIcon}><i>i</i></Button>

                <Button className={styles.palette}></Button>
            </div> 

            {isPaletteOpen && (
                <div className={styles.paletteDisplay}>
                    <Palette />
                </div>
            )}
       </div> 
    )
}

export {
    Tools
}