import styles from './App.module.css'
import type { Presentation } from './model/types/presentation'
import { getPreviewMode, setPreviewMode } from './viewModel/viewModel'
import { PreviewOverlay } from './views/previewOverlay/PreviewOverlay'
import { SlideList } from './views/slidelist/SlideList'
import { Toolbar } from './views/toolbar/Toolbar'
import { Workspace } from './views/workspace/Workspace'

type AppProps = {
    presentation: Presentation
}

function App({presentation}: AppProps) {
  if (!getPreviewMode()) {
    return (
      <div className={styles.page}>
        <Toolbar presentation={presentation} />
        <div className={styles.main}>
          <SlideList slides={presentation.slides} />
          <Workspace slides={presentation.slides} />
        </div>
      </div>
    )
  } else {
    return (
      <PreviewOverlay
        slides={presentation.slides}
        onClose={() => setPreviewMode(false)}
      />
    )
  }
}

export default App

//что такое jsx?
//сделать Preview overlay
//исправить баг с кривым отображением палитры
//вынести рендер объекта в отдельный компонент

//поменять везде 1 букву
