import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
<% if (useGuards) { %>
import PrivateRoutes from './components/PrivateRoutes'
<% } %>
<% if (useLazy) { %>
import { lazy, Suspense } from 'react'
import Loading from './components/Loading'

const HomePage = lazy(() => import('./view/Home/HomePage'))
const LoginPage = lazy(() => import('./view/Login/LoginPage'))
<% } else { %>
import HomePage from './view/Home/HomePage'
import LoginPage from './view/Login/LoginPage'
<% } %>

const router = createBrowserRouter([
  {
    path: '/login',
    element: <% if (useLazy) { %><Suspense fallback={<Loading />}><LoginPage /></Suspense><% } else { %><LoginPage /><% } %>,
  },
  <% if (useGuards) { %>
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <% if (useLazy) { %><Suspense fallback={<Loading />}><HomePage /></Suspense><% } else { %><HomePage /><% } %>,
      },
    ],
  },
  <% } else { %>
  {
    path: '/',
    element: <% if (useLazy) { %><Suspense fallback={<Loading />}><HomePage /></Suspense><% } else { %><HomePage /><% } %>,
  },
  <% } %>
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
