import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../styles.css'
import House from '../pages/House.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <House />
  </StrictMode>,
)
