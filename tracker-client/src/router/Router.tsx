import App from '../components/App'
import { createBrowserRouter, Link } from 'react-router-dom';
import { ErrorHandler } from '../components/error';
import LogIn from '../components/auth/log-in';
import Register from '@/components/auth/register';
import Tables from '@/components/table/tables';
import PrivateRoutes from './private-route';
import Success from '@/components/auth/Success';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorHandler />,
        children: [
            {
                index: true,
                element: <LogIn></LogIn>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'success',
                element: <Success></Success>
            },
            {
                path: 'app',
                element: <PrivateRoutes component={<Tables></Tables>}></PrivateRoutes>
            },
            {
                path: '*',
                element: <Link to={`/`} >
                    Not sure where you are going... click here to go home
                </Link>
            }
        ]
    }
]);