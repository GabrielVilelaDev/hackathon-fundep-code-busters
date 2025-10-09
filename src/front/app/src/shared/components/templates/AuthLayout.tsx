import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  )
}
