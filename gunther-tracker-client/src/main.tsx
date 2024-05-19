import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router.tsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faPenToSquare} from '@fortawesome/free-regular-svg-icons';
library.add(faComment, faPenToSquare)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
