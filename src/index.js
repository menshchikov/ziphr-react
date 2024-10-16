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
import {Photo} from "./components/Photos/Photo";

function NotFound() {
    return <div className="m-auto text-center h-[100vh] content-center">
        <h1 className="text-5xl font-bold text-gray-800">Sorry, this page isn't available</h1>
        <h2 className="text-3xl mt-2 text-gray-600">The link you followed may be broken, or the page may have been removed.</h2>
        <a href="/" className="mt-2 block text-blue-600 visited:text-purple-600">Go back to home page.</a>
    </div>;
}

const router = createBrowserRouter([
    {
        path: '/', element: (<App/>), children: [
            {index: true, element: (<Navigate to={'/dashboard'} replace/>)},
            {path: 'dashboard', element: (<Dashboard/>), index: true},
            {path: 'posts', element: (<Posts/>)},
            {path: 'albums', element: (<Albums/>)},
            {path: 'photos', element: (<Photos/>)},
            {path: 'photos/:id', element: (<Photo/>)},
        ],
        errorElement: (<NotFound/>),
    },
    {
        path: '/', element: (<Navigate to={'/Dashboard'}/>),
    },
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
