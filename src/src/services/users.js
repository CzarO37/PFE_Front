import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'

const login = (user) => {
    const request = axios.get(baseUrl,user)
    request.then(response => console.log(response.data))
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

export default {getAll, create, del, update}