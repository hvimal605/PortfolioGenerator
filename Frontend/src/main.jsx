import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux"
import rootReducer from './reducer';
import { Toaster } from 'sonner';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['portfolio/setResumeFile'],
        // Ignore these paths in the state
        ignoredPaths: ['portfolio.resumeFile'],
      },
    }),
});

createRoot(document.getElementById('root')).render(
  <Provider store ={store} >
  <StrictMode>
    <BrowserRouter >
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster richColors position="top-right" expand={true} closeButton />
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
  </Provider>,
)
