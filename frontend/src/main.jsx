//1. Buscar el elemento HTML con id="root" (está en index.html)                                                                                      
//2. Renderizar (mostrar) el componente <App /> dentro de ese elemento                                                                               
//3. Activar StrictMode de React (modo estricto para detectar problemas) 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
