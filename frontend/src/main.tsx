import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/globals.css"
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/student/Dashboard.tsx'
import CanteenDashboard from './components/canteen/Dashboard.tsx'
import Signup from './components/student/Signup.tsx'
import StudentLogin from './components/student/StudentLogin.tsx'
import CanteenLogin from './components/canteen/CanteenLogin.tsx'
import AddFoodPage from './components/canteen/AddFood.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App></App>},
  {path: '/student-dashboard', element: <Dashboard></Dashboard>},
  {path: '/canteen-dashboard', element: <CanteenDashboard></CanteenDashboard>},
  {path: '/signup', element: <Signup></Signup>},
  {path: '/student-login', element: <StudentLogin></StudentLogin>},
  {path: '/canteen-login', element: <CanteenLogin></CanteenLogin>},
  {path: '/add-food', element: <AddFoodPage></AddFoodPage>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

