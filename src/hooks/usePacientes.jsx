import {useContext} from 'react'
import PacientesContext from '../context/PacientesProvider'

const usePacientes = () => {
    return useContext(PacientesContext) //usecontext se accede a los valores de un context que lo hemos difinido este caso AuthContext
}

export default usePacientes;