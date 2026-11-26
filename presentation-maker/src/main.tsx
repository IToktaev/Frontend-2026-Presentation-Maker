import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTestPresentation } from './data/data.js';
import { getState, setInitialState } from './model/editor.js';
import { addEditorChangeHandler } from './model/editor.js';
import { addViewModelChangeHandler, initializeViewModel } from './viewModel/viewModel.ts';

const initialData = createTestPresentation()
setInitialState(initialData)  
initializeViewModel()

const root = createRoot(document.getElementById('root')!)

function renderApp(): void {
  root.render(
    <StrictMode>
      <App presentation={getState()!} />
    </StrictMode>
  )
}

renderApp()

addEditorChangeHandler(() => {renderApp();})
addViewModelChangeHandler(() => {renderApp()})