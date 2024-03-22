import invoice from "../components/invoices/IInvoice"
import type { Params } from "react-router-dom"

export async function fetchInvoices({ params }: { params: Params<'id'> }): Promise<invoice[]> {
    console.log(params)
    const response = await fetch(`/invoices/${params.id}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    )
    const invoices: invoice[] = await response.json()
    return invoices
}