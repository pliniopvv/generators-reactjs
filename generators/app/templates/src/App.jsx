import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <% if (useGuards) { %>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<% if (useLazy) { %><Suspense fallback={<Loading />}><HomePage /></Suspense><% } else { %><HomePage /><% } %>}
          />
        </Route>
        <% } else { %>
        <Route
          path="/"
          element={<% if (useLazy) { %><Suspense fallback={<Loading />}><HomePage /></Suspense><% } else { %><HomePage /><% } %>}
        />
        <% } %>
        <Route
          path="/login"
          element={<% if (useLazy) { %><Suspense fallback={<Loading />}><LoginPage /></Suspense><% } else { %><LoginPage /><% } %>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
