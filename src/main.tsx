import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './main.css';
import App from './App';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {Dashboard} from './components/Dashboard/Dashboard';
import {Posts} from './components/Posts/Posts';
import {Albums} from './components/Albums/Albums';
import {Photos} from './components/Photos/Photos';
import {Photo} from './components/Photo/Photo';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Album} from './components/Album/Album';
import {Post} from './components/Post/Post';
import {User} from './components/User/User';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {NotFound} from './NotFound.tsx';

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