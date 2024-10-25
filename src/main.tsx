import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './main.css';
import './output.css';
import App from './App';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {Posts} from "./components/Posts/Posts";
import {Albums} from "./components/Albums/Albums";
import {Photos} from "./components/Photos/Photos";
import {Photo} from "./components/Photo/Photo";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Album} from "./components/Album/Album";
import {Post} from "./components/Post/Post";
import {User} from "./components/User/User";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function NotFound() {
    return <div className="m-auto text-center h-[100vh] content-center">
        <h1 className="text-5xl font-bold text-gray-800">Sorry, this page isn't available</h1>
        <h2 className="text-3xl mt-2 text-gray-600">The link you followed may be broken, or the page may have been
            removed.</h2>
        <a href="/" className="mt-2 block text-blue-600 visited:text-purple-600">Go back to home page.</a>
    </div>;
}

const router = createBrowserRouter([
    {
        path: '/', element: (<App/>), children: [
            {index: true, element: (<Navigate to={'/dashboard'} replace/>)},
            {path: 'dashboard', element: (<Dashboard/>), index: true},
            {path: 'posts', element: (<Posts/>)},
            {path: 'posts/:id', element: (<Post/>)},
            {path: 'albums', element: (<Albums/>)},
            {path: 'albums/:id', element: (<Album/>)},
            {path: 'photos', element: (<Photos/>)},
            {path: 'photos/:id', element: (<Photo/>)},
            {path: 'users/:id', element: (<User/>)},
        ],
        errorElement: (<NotFound/>),
    },
    {
        path: '/', element: (<Navigate to={'/Dashboard'}/>),
    },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    </StrictMode>
);