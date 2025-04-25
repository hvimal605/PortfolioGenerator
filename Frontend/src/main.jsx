import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux"
import rootReducer from './reducer';
import { Toaster } from 'react-hot-toast';


const store = configureStore({
  reducer:rootReducer,
})

createRoot(document.getElementById('root')).render(
  <Provider store ={store} >
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <Toaster  toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}/>
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
  </Provider>,
)
