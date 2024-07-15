import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EmployeeStoreProvider } from './store/store.tsx'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <EmployeeStoreProvider>
        <App />
    </EmployeeStoreProvider>
)
