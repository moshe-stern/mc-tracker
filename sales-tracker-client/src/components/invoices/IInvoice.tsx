export default interface invoice {
    invoiceID: number
    supplier: string
    customer: string
    quantity: string
    rate: string
    description: string
    expenses: number
    comments: string
    invoiceDate: Date
}