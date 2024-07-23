import { FormEvent, useState } from "react"
import invoice from "./IInvoice"
import { serverUrl } from "../../utils/icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { theUserId } from "../auth/LogIn";
export default function AddInvoice() {
    const { state } = useLocation();
    const [invoice, setInvoice] = useState<invoice | Partial<invoice>>(state as invoice ? { ...state as invoice } : { invoiceDate: new Date() })
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    return (
        <>
            <h1>{state ? 'Edit' : 'Add'} Invoice</h1>
            <h3><Link to={`/${theUserId}/invoices`} className="link">Invoices</Link></h3>
            <form onSubmit={addInvoice} onChange={handleInputChange} className="form-group">

                <div className="form-group">
                    <label htmlFor="">Invoice ID</label>
                    <input type="number" name='invoiceID' required placeholder="Invoice ID" className="form-control" value={invoice.invoiceID} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Customer</label>
                    <input type="text" name='customer' required placeholder="Customer" className="form-control" value={invoice.customer} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Supplier</label>
                    <input type="text" name='supplier' required placeholder="Supplier" className="form-control" value={invoice.supplier} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Quantity</label>
                    <input type="text" name='quantity' required placeholder="Quantity" className="form-control" value={invoice.quantity} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Rate</label>
                    <input type="text" name='rate' required placeholder="Rate" className="form-control" value={invoice.rate} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <textarea name='description' placeholder="Description" className="form-control" value={invoice.description} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Expenses</label>
                    <input type="number" name='expenses' required placeholder="Expenses" className="form-control" value={invoice.expenses} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Comments</label>
                    <textarea name='comments' required placeholder="Comments" className="form-control" value={invoice.comments} />
                </div>
                <div className="form-group">
                    <input type="date" name='invoiceDate' value={invoice.invoiceDate?.toString()} placeholder="Date" className="form-control" />
                </div>
                <button className="btn btn-outline-success">{state ? 'Save' : 'Add'} Invoice</button>
            </form>
            {error && <p>{error}</p>}
        </>

    )
    function handleInputChange(event: React.ChangeEvent<HTMLFormElement>) {
        setInvoice((prevInvoice: invoice | Partial<invoice>) => ({
            ...prevInvoice,
            [event.target.name]: event.target.value
        }));
    }
    async function addInvoice(e: FormEvent) {
        e.preventDefault()
        const response = await fetch(`${serverUrl}/invoices/${theUserId}`, {
            method: 'POST',
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
        if (!response.ok) {
            setError(await response.text())
            return
        }
        navigate(`/${theUserId}/invoices`)
    }
}
