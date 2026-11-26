import { useState } from 'react'
import styles from './App.module.css'
import { useKeyBoard } from './hooks/useKeyBoard'
import type { Presentation } from './model/types/presentation'
import { getPreviewMode, setPreviewMode } from './viewModel/viewModel'
import { PreviewOverlay } from './views/previewOverlay/PreviewOverlay'
import { SlideList } from './views/slidelist/SlideList'
import { Toolbar } from './views/toolbar/Toolbar'
import { Workspace } from './views/workspace/Workspace'
import type { SlideObject } from './model/types/objects'

type AppProps = {
    presentation: Presentation
}

function App({presentation}: AppProps) {
  useKeyBoard()

  const [localChangedObjects, setLocalChangedObjects] = useState<SlideObject[]>([])

  if (!getPreviewMode()) {
    return (
      <div className={styles.page}>
        <Toolbar 
          presentation={presentation}
          localChangedObjects={localChangedObjects}
          onLocalChangedObjectsChange={setLocalChangedObjects}
        />
        <div className={styles.main}>
          <SlideList slides={presentation.slides} />
          <Workspace slides={presentation.slides} localChangedObjects={localChangedObjects} />
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

//в целом надо быть очень внимательным с обновлением модели в этой лабе, т.к. потому будут проблемы 
//с ctrl + Z
//глубина истории должна быть ограничена