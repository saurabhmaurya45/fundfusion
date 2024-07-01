import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { RouterProvider } from 'react-router-dom';
import routes from './Router/routes.jsx';
import {Provider} from 'react-redux'
import Store from './Redux/Store.jsx';
import Home from './pages/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      secretKey={import.meta.env.VITE_SECRET_KEY}
      activeChain={Sepolia}>
      <Provider store={Store}>
          <RouterProvider router={routes}>
            <App />
            <Home/>
          </RouterProvider>
      </Provider>

    </ThirdwebProvider>
  </React.StrictMode>,
)
