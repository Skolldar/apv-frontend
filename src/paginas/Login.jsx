import {useState} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth";
import clienteAxios from '../config/axios';



const Login = () => {

    const [email, setEmail] = useState('test@test.com')
    const [password, setPassword] = useState('Test@123')
    const [alerta, setAlerta] = useState({})
    const [showPassword, setShowPassword] = useState(false)


    const {setAuth} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:  true
            })
            setTimeout(() => {
                // remover alerta aqui.
                setAlerta({})
             }, 3000);
            return
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {email, password});
            localStorage.setItem('token', data.token) //Guardar el json web token 
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            const msg = 'This email is not registered, please create an account' || error.message || 'Hubo un error, intenta de nuevo';
            console.log(error.response || error);
            setAlerta({
                msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }

    const {msg} = alerta

    return (
      <>    
            <div> 
            <h1 className="text-indigo-600 font-black text-6xl mt-2">
                Inicia sesion y Administra a tus 
                <span className="text-black"> Pacientes</span>
            </h1>
            </div>

            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && 
                <Alerta
              alerta={alerta} 
            />}

            <form onSubmit={handleSubmit}>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                    type="email"
                    placeholder="Email del Registro"
                    className="border w-full p-3  mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Password
                    </label>
                 <div className="relative">
                    <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu Password"
                    className="border w-full p-3 bg-gray-50 rounded-xl pr-10"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <button
                         type="button"
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                         onClick={() => setShowPassword(!showPassword)}
                         aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                         {showPassword ? (
                             <AiOutlineEyeInvisible className="h-5 w-5" />
                         ) : (
                             <AiOutlineEye className="h-5 w-5" />
                         )}
                    </button>
                    </div>
                </div>
                <input type="submit"
                value="Iniciar Sesion"
                className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/registrar">No tienes una cuenta? Registrate</Link>
                <Link 
                    className="block text-center my-5 text-gray-500" 
                    to="/olvide-password">Olvide mi password</Link>

            </nav>
        </div>
      </>
    )
  }
  
  export default Login;
  