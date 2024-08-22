import { useUserStore } from '@/store/user'
import { Navigate } from 'react-router-dom'
function PrivateRoutes (props: { component: JSX.Element}) {
    const { component } = props
    return (
        useUserStore.getState().isAuthenticated() ? component : <Navigate to='/login' />
    )
}
export default PrivateRoutes