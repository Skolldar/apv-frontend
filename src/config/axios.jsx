import axios from 'axios'

const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const clienteAxios = axios.create({
    baseURL: `${base}/api`
})

export default clienteAxios;