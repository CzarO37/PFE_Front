import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const loginUser = (user) => {
    const request = axios.post(`${baseUrl}/login`,user)
    return request.then(response => response.data)
}

const signUpUser = (user) => {
    const request = axios.post(baseUrl,user)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, loginUser, getById, signUpUser}