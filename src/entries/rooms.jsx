import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../styles.css'
import Rooms from '../pages/Rooms.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rooms />
  </StrictMode>,
)
