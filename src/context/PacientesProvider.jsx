import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()


export const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({}) //objeto.

    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)

                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth]) //se pasa como dependencia y se ejecute otra vz obtenerPacientes() para traerse los pacientes de los usuarios autenticados CON pacientes.

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        if(paciente.id) {
            try { //paciente.id(viene del STATE) y pacienteState._id(viene del MONGODB)
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config )
    
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
    
                setPacientes([pacienteAlmacenado, ...pacientes])
    
                console.log(pacienteAlmacenado)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }


    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Confirmas que deseas eliminar?')
        if(confirmar) {
            try {
                const token = localStorage.getItem('token') //REquest de autenticado
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext