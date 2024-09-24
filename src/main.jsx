import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Routing from './common/Routing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Routing />
  </StrictMode>,
)
