import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation()

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
