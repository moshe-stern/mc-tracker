import invoice from './IInvoice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { comment, edit } from '../../utils/Utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theUserId } from '../auth/LogIn'
interface InvoiceProps {
  invoice: invoice
}

export default function Invoice(props: InvoiceProps) {
  const [showIcon, setShowIcon] = useState(false)
  const navigate = useNavigate()
  const { invoice } = props

  return (
    <>
      <tr>
        <td>{invoice.invoiceID}</td>
        <td>{invoice.customer}</td>
        <td>{invoice.description}</td>
        <td>{invoice.quantity}</td>
        <td>{invoice.expenses}</td>
        <td>{invoice.rate}</td>
        <td>{invoice.supplier}</td>
        <td>{invoice.invoiceDate.toLocaleString()}</td>
        <td >
          <div className='icon-cell'>
            {invoice.comments && <FontAwesomeIcon className='icon' onClick={() => setShowIcon(!showIcon)} icon={comment} />}
            <FontAwesomeIcon className='icon' onClick={() => navigate(`/${theUserId}/addinvoice`, { state: invoice })} icon={edit} />
          </div>
        </td>
      </tr>
      {showIcon && <td colSpan={100} className='comment-cell'>{invoice.comments}</td>}
    </>

  )
}
