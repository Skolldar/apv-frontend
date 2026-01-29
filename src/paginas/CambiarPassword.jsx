import {useState} from 'react'
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const CambiarPassword = () => {

  const {guardarPassword} = useAuth()

  const [alerta, setAlerta] = useState({})

  const [password, setPassword] =useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })
  const [showPwdActual, setShowPwdActual] = useState(false)
  const [showPwdNuevo, setShowPwdNuevo] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    
    if(Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        // remover alerta aqui.
        setAlerta({})
     }, 3000);
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password.pwd_nuevo)) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
     }, 3000);
      return
    }
    
    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
    setTimeout(() => {
      setAlerta({})
   }, 3000);
   //reset form
   setPassword({
    pwd_actual: '',
    pwd_nuevo: ''
   })
  }

  const {msg} = alerta

  return (
    <>
      <AdminNav />
        <h2 className="font-black mt-10 text-3xl text-center">
          Cambiar Password
        </h2>
        <p className="text-xl mt-5 text-center mb-10">
            Modifica tu {''}              
            <span className="text-indigo-600 font-bold">
            Password aqui
            </span>
        </p>
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
               
            {msg && <Alerta alerta={alerta} />}

            <form
              onSubmit={handleSubmit}>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">
                Password Actual
                </label>

                <div className="relative mt-3">
                <input 
                  type={showPwdActual ? "text" : "password"}
                  className="border bg-gray-50 w-full p-2 rounded-lg pr-10"
                  name="pwd_actual"
                  placeholder='Escribe tu Password actual'
                  value={password.pwd_actual}
                  onChange={e => setPassword({
                    ...password, 
                    [e.target.name] : e.target.value
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPwdActual(!showPwdActual)}
                  aria-label={showPwdActual ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwdActual ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
                </div>
              </div>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">
                    Nuevo Password
                </label>

                <div className="relative mt-3">
                <input 
                  type={showPwdNuevo ? "text" : "password"}
                  className="border bg-gray-50 w-full p-2 rounded-lg pr-10"
                  name="pwd_nuevo"
                  placeholder='Escribe tu nuevo password'
                  value={password.pwd_nuevo}
                  onChange={e => setPassword({
                    ...password, 
                    [e.target.name] : e.target.value
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPwdNuevo(!showPwdNuevo)}
                  aria-label={showPwdNuevo ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwdNuevo ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
                </div>
              </div>

              <input 
                type="submit"
                value="Actualizar Password"
                className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
              />
            </form>
          </div>

        </div>
    </>
      )
}

export default CambiarPassword
