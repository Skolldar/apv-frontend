import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg:'Coloca tu nuevo Password'
        })
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
     comprobarToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlerta({msg:'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales', error: true});
      setTimeout(() => setAlerta({}), 3000);
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})

      setAlerta({
        msg: data.msg 
      })
      //reset form
      setPassword('')
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  
  }

  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no pierdas acceso a 
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {msg && <Alerta
           alerta={alerta}  
          />}
      {tokenValido && !passwordModificado && (
        <>
          <form onSubmit={handleSubmit}>

            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <div className="relative mt-3">
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
              value="Guardar Nuevo Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>
        </>
      )}

      {passwordModificado &&
        <Link 
          className="block text-center my-5 text-gray-500"
          to="/">Tienes una cuenta? <span className='text-indigo-600 cursor-pointer hover:text-indigo-700 font-semibold'>Inicia Sesion</span>
        </Link>
      }


      </div>
  </>
  )
}

export default NuevoPassword
