import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'


//Je laisse pour voir comment faire par apres, pour l'instant c'est pas fonctionnel
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const loginUser = (user) => {
    console.log("User in usersService: ",user)
    const request = axios.post(`${baseUrl}/login`,user)
    return request.then(response => response.data)
}

const signUpUser = (user) => {
    console.log("User in usersService: ",user)
    const request = axios.post(baseUrl,user)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    request.then(response => console.log(response.data))
    return request.then(response => response.data)
}

//Je laisse pour voir comment faire par apres, pour l'instant c'est pas fonctionnel
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

//Je laisse pour voir comment faire par apres, pour l'instant c'est pas fonctionnel
const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

//Je laisse pour voir comment faire par apres, pour l'instant c'est pas fonctionnel
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

export default {getAll, create, del, update, loginUser, getById, signUpUser}