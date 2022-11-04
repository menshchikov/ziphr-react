import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import {Dashboard} from "./components/dashboard/Dashboard";
import {Posts} from "./components/Posts/Posts";
import {Albums} from "./components/Albums/Albums";
import {Photos} from "./components/Photos/Photos";

const router = createBrowserRouter([
  { path: '/', element: (<App></App>), children:[
      { path: 'dashboard', element: (<Dashboard></Dashboard>)},
      { path: 'posts', element: (<Posts></Posts>)},
      { path: 'albums', element: (<Albums></Albums>)},
      { path: 'photos', element: (<Photos></Photos>)},
    ]},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
