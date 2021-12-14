import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/announcements'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const getDetails = (id,token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
       key: "userId"
    };
    const request = axios.get(`${baseUrl}/detail/${id}`,bodyParameters,config)
    return request.then(response => response.data)
}

export default {getAll, getById, getDetails}