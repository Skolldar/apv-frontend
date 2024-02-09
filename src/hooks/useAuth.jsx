import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext) //usecontext se accede a los valores de un context que lo hemos difinido este caso AuthContext
}

export default useAuth;