import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import { CartProvider } from './context/CartContext'
import { EmployeeProvider } from './context/EmployeeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <WatchlistProvider>
          <CartProvider>
            <EmployeeProvider>
              <App />
            </EmployeeProvider>
          </CartProvider>
        </WatchlistProvider>
    </BrowserRouter>
)
