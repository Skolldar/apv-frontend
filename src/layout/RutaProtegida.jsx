import { Outlet, Navigate} from "react-router-dom"
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {
    const {auth, cargando} = useAuth()

    if(cargando) return 'cargando'

  return (
    <>
    <div>
        <Headers />
        {auth?._id ? 
        ( <main className="container mx-auto mt-10 md:mt-20 px-5">
            <Outlet />
            </main>
        ): <Navigate to="/" />}

        <Footer />
      
    </div>
    </>
  )
}

export default RutaProtegida
