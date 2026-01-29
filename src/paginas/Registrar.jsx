import {useState} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showRepetirPassword, setShowRepetirPassword] = useState(false)

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg:'Hay campos vacíos', error: true})
            setTimeout(() => {
                setAlerta({})
             }, 3000);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailNormalized = email.toLowerCase().trim();
        const emailValid = emailRegex.test(emailNormalized);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        if (!passwordRegex.test(password)) {
          setAlerta({msg:'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales', error: true});
          setTimeout(() => setAlerta({}), 3000);
          return;
        }

        if (!emailValid) {
          setAlerta({msg:'Dirección de correo electrónico no válida', error: true});
          setTimeout(() => setAlerta({}), 3000);
          return;
        }
        if(password !== repetirPassword) {
            setAlerta({msg:'Las contraseñas no son iguales', error: true})
            setTimeout(() => {
                setAlerta({})
             }, 3000);
            return;
        }

        setTimeout(() => {
            setAlerta({})
         }, 3000);

        try {
            await clienteAxios.post(`/veterinarios`, {nombre, email, password})
            
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
             }, 3000);

        } catch (error) {
            const message = error?.response?.data?.msg || error.message || 'Error del servidor'
            setAlerta({
                msg: message,
                error: true 
            })
        }

    }

    const {msg} = alerta

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu cuenta y Administra 
                <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>

        <div className="pt-6 md:mt-10 shadow-lg rounded-xl bg-white">
                <div className="h-16 flex items-center justify-center mb-4">{msg && <Alerta alerta={alerta} />}</div>
            <div className="px-5">
                    <form 
                        onSubmit={handleSubmit}
                        className='px-0'>
                <div>
                    <label className="uppercase mb-3 text-gray-600 block text-xl font-bold">
                        Nombre
                    </label>
                    <input 
                    type="text"
                    placeholder="Tu Nombre"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase mb-3 text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                    type="email"
                    placeholder="Email del Registro"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase mb-3 text-gray-600 block text-xl font-bold">
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
                <div className="my-5">
                    <label className="uppercase mb-3 text-gray-600 block text-xl font-bold">
                        Repetir Password
                    </label>
                    <div className="relative">
                        <input 
                        type={showRepetirPassword ? "text" : "password"}
                        placeholder="Repite tu Password"
                        className="border w-full p-3 bg-gray-50 rounded-xl pr-10"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowRepetirPassword(!showRepetirPassword)}
                            aria-label={showRepetirPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showRepetirPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
                <input type="submit"
                value="Crear Cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
                <nav className=" my-10 px-5 lg:flex lg:justify-between">
                <Link 
                    className="block text-center text-gray-500"
                    to="/">Tienes una cuenta? Inicia Sesion</Link>
                <Link 
                    className="block text-center text-gray-500" 
                    to="/olvide-password">Olvide mi password</Link>
                </nav>
                </form>
            </div>
        </div>
      </>
    )
  }
  
  export default Registrar;
  