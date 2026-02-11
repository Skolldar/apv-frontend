import usePacientes from "../hooks/usePacientes"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const Paciente = ({paciente}) => {
    const {setEdicion, eliminarPaciente} = usePacientes()

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente
    
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black">{nombre}</span> 
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Propietario: {''}
            <span className="font-normal normal-case text-black">{propietario}</span> 
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Email: {''}
            <span className="font-normal normal-case text-black">{email}</span> 
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black">{nombre}</span> 
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Fecha de Alta: {''}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span> 
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Sintomas: {''}
            <span className="font-normal normal-case text-black">{sintomas}</span> 
        </p>

        <div className=" flex justify-between mt-5 gap-5">
            <button
                type="button"
                className="p-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center"
                onClick={() => setEdicion(paciente)}
                aria-label="Editar"
            >
              <FaPencilAlt className="h-5 w-5" />
            </button>

            <button
                type="button"
                className="p-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center"
                onClick={() => eliminarPaciente(_id)}
                aria-label="Eliminar"
            >
               <FaTrash className="h-5 w-5" />
            </button>
        </div>
    </div>
  )
}

export default Paciente
