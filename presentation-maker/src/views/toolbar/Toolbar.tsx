import { Button } from '../../components/button/Button'
import { TextInput } from '../../components/textInput/TextInput'
import { SlideTools } from './slideTools/SlideTools'
import { Tools } from './tools/Tools'
import styles from './Toolbar.module.css'

import SlideShowImage from '../../assets/slide-show.png'
import MicrophoneImage from '../../assets/micro.png'
import type { Presentation } from '../../model/types/presentation'
import { setPreviewMode } from '../../viewModel/viewModel'
import { dispatch } from '../../model/editor'
import { updatePresentationTitle } from '../../model/functions/presentation'
import type { SlideObject } from '../../model/types/objects'
import { usePdfExport } from '../../hooks/usePdfExport'

type ToolbarProps = {
    presentation: Presentation,
    localChangedObjects: SlideObject[]
    onLocalChangedObjectsChange: (objects: SlideObject[]) => void
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

function handleSlideShow() {
    setPreviewMode(true)
}

function handlePresTitleInput(value: string) {
    dispatch(updatePresentationTitle, value)
}

function Toolbar({presentation, localChangedObjects, onLocalChangedObjectsChange, canRedo, canUndo, onRedo, onUndo}: ToolbarProps) {
    const { exportToPdf } = usePdfExport()

    return(
        <div className={styles.toolbar}>
            <div className={styles.title}>
                <TextInput 
                    onChange={(event) => handlePresTitleInput(event.target.value)}
                    className={styles.titleInput}
                    defaultValue={presentation.title}
                >
                </TextInput>
            </div>

            <SlideTools />
            <Tools 
                localChangedObjects={localChangedObjects}
                onLocalChangedObjectsChange={onLocalChangedObjectsChange}
            />

            <div className={styles.historyButtons}>
                <Button 
                    className={canUndo ? styles.historyButton : styles.historyButton + ' ' + styles.historyButtonDisabled}
                    onClick={onUndo}
                    disabled={!canUndo}
                >
                    ↩
                </Button>

                <Button 
                    className={canRedo ? styles.historyButton : styles.historyButton + ' ' + styles.historyButtonDisabled}
                    onClick={onRedo}
                    disabled={!canRedo}
                >
                    ↪
                </Button>
            </div>

            <Button className={styles.slideShow} onClick={handleSlideShow}>
                <img src={SlideShowImage} />
            </Button>

            <Button className={styles.pdfExport} onClick={() => exportToPdf(presentation)}>
                Экспорт в PDF
            </Button>


            <Button className={styles.voiceIcon}>
                <img src={MicrophoneImage} />   
            </Button>
        </div>
    )
}

export {
    Toolbar
}