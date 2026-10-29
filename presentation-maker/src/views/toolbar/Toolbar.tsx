import { Button } from '../../components/button/Button'
import { TextInput } from '../../components/textInput/TextInput'
import { SlideTools } from './slideTools/SlideTools'
import { Tools } from './tools/Tools'
import styles from './Toolbar.module.css'

import SlideShowImage from '../../assets/slide-show.png'
import MicrophoneImage from '../../assets/micro.png'
import InfoImage from '../../assets/info.png'
import type { Presentation } from '../../model/types/presentation'
import { setPreviewMode } from '../../viewModel/viewModel'
import { dispatch } from '../../model/editor'
import { updatePresentationTitle } from '../../model/functions/presentation'

type ToolbarProps = {
    presentation: Presentation
}

function handleSlideShow() {
    setPreviewMode(true)
}

function handlePresTitleInput(value: string) {
    dispatch(updatePresentationTitle, value)
}

function Toolbar({presentation}: ToolbarProps) {
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
            <Tools />

            <div className={styles.slideShowBlock}>
                <h3 className={styles.slideShowTitle}>Слайд-шоу</h3>
                <Button className={styles.slideShow} onClick={handleSlideShow}>
                    <img src={SlideShowImage} />
                </Button>
            </div>

            <div className={styles.voiceBlock}>
                <h3 className={styles.voiceTitle}>Голосовой ввод</h3>
                <div className={styles.voiceBlockBottomSection}>
                    <Button className={styles.voiceIcon}>
                        <img src={MicrophoneImage} />
                    </Button>
                    <Button className={styles.voiceInfo}>
                        <img src={InfoImage} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {
    Toolbar
}