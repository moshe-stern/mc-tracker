import { Outlet } from 'react-router-dom'
import '../styles/index.css'
import '../styles/app.css'
import '../styles/bootstrap.css'
import '../styles/shared.scss'

function App () {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
