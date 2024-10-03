import ReactDOM from 'react-dom/client'
import './index.css'
import {rerenderTree} from './render'
import {state} from './state'

//34
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

rerenderTree(state)

