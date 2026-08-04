import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import { UIProvider } from "./context/UIContext";

import './index.css';

import { ToastContainer } from "react-toastify";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='light'>
      <Notifications/>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick  
        pauseOnHover
        draggable
        theme="colored"
    />
      <UIProvider>
         <App/>
      </UIProvider>
    </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
