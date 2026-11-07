import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'
import '@fontsource/montserrat/800.css'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { AuthProvider } from './auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)
