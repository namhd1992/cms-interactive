import React from 'react';
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({ reducer: rootReducer, devTools: true });

createRoot(document.getElementById('root')!).render(
    //<Provider store={store}>
    //    <App />
    //</Provider>
    <Provider store={store}>
        <React.Fragment>
            <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
                <App />
            </BrowserRouter>
        </React.Fragment>
    </Provider>
    //<StrictMode>
    //<Provider store={store}>
    //    <React.Fragment>
    //        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
    //            <App />
    //        </BrowserRouter>
    //    </React.Fragment>
    //    </Provider>
    //</StrictMode>
    //<StrictMode>
    //  <App />
    //</StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



//Code cu
//createRoot(document.getElementById('root')!).render(
//  <StrictMode>
//        <App />                
//  </StrictMode>,
//)
