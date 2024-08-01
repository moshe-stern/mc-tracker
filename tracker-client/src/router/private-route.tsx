import { useUserStore } from '@/store/user'
import { Navigate } from 'react-router-dom'
function PrivateRoutes (props: { component: JSX.Element}) {
    return (
        useUserStore.getState().isAuthenticated() ? <props.component></props.component> : <Navigate to='/login' />
    )
}
export default PrivateRoutes