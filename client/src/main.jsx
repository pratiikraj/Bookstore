import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import store from './store/index.js'
import axios from 'axios'

// Global Axios request interceptor to dynamically rewrite local API requests to the production API url
axios.interceptors.request.use((config) => {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:2000';
  if (config.url && config.url.startsWith('http://localhost:2000')) {
    config.url = config.url.replace('http://localhost:2000', backendUrl);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Global window.fetch patch to dynamically rewrite local API requests to the production API url
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:2000';
  if (typeof resource === 'string' && resource.startsWith('http://localhost:2000')) {
    resource = resource.replace('http://localhost:2000', backendUrl);
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
<App />
    </Provider>
    </BrowserRouter>
    
  </StrictMode>,
)
