import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/globals.css"
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/student/Dashboard.tsx'
import CanteenDashboard from './components/canteen/Dashboard.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App></App>},
  {path: '/student-dashboard', element: <Dashboard></Dashboard>},
  {path: '/canteen-dashboard', element: <CanteenDashboard></CanteenDashboard>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

