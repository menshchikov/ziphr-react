import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {Posts} from "./components/Posts/Posts";
import {Albums} from "./components/Albums/Albums";
import {Photos} from "./components/Photos/Photos";

const router = createBrowserRouter([
    {
        path: '/', element: (<App></App>), children: [
            {index: true, element: (<Navigate to={'/dashboard'} replace/>)},
            {path: 'dashboard', element: (<Dashboard></Dashboard>), index: true},
            {path: 'posts', element: (<Posts></Posts>)},
            {path: 'albums', element: (<Albums></Albums>)},
            {path: 'photos', element: (<Photos></Photos>)},
        ]
    },
    {
        path: '*', element: (<Navigate to={'/Dashboard'}/>)
    }
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
