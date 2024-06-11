import App from '../components/App'
import { createBrowserRouter, Link } from 'react-router-dom';
import { ErrorHandler } from '../utils/Utils';
import { fetchInvoices } from '../loaders/Loaders';
import LogIn from '../components/auth/LogIn';
import InvoiceTable from '../components/table/InvoiceTable';
import Success from '../components/auth/Success';
import AddInvoice from '../components/table/AddInvoice';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorHandler />,
        children: [
            {
                index: true,
                element: <LogIn />
            },
            {
                path: ':id/invoices',
                element: <InvoiceTable />,
                loader: fetchInvoices,
            },
            {
                path: 'success',
                element: <Success />
            },
            {
                path: ':id/addinvoice',
                element: <AddInvoice />
            },
            {
                path: '*',
                element: <Link to={`/`} >
                    <h2>Not sure where you are going..... click here to go home</h2>
                </Link>
            }
        ]
    }
]);