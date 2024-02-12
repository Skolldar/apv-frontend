import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  
  return (
    <>
    <div className="login min-h-screen">

    <main className="container mx-auto md:grid md:grid-cols-2   gap-20 p-5">
      <Outlet />
    </main>
    </div>
    </>
  )
}

export default AuthLayout
