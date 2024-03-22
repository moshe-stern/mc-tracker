import { Link, useLoaderData } from "react-router-dom"
import invoice from "./IInvoice"
import Invoice from "./Invoice"
import { theUserId } from "../auth/LogIn"
export default function InvoiceTable() {
  const invoices = useLoaderData() as invoice[]
  return (
    <>
      <div className="container" >
        <div className="invoice-buttons-container">
          <Link to={`/${theUserId}/addinvoice`}> <button className="btn btn-outline-success">Add invoice</button></Link>
          <Link to={`/`}> <button className="btn btn-outline-success">Home</button></Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Supplier</th>
                <th>customer</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Description</th>
                <th>Expenses</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices?.map((invoice: invoice) => invoice && <Invoice invoice={invoice} />)}
            </tbody>
          </table>
        </div>


      </div>
    </>


  )
}
