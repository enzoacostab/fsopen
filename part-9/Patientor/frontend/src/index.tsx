import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './state'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Context><App /></Context>)