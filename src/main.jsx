import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LogIn from './LogIn.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

const router =createBrowserRouter([
  {
    path: '/',
    element: <LogIn />,
    children: [
      {
        path: 'signin',
        element: <SignIn/>
      },{
        path: 'signup',
        element: <SignUp/>
      }
    ]
  },
  {
  path: '/home',
  element: <App />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
