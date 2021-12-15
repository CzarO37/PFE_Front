import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/reports'

const getAll = (token) => {
    const request = axios.get(`${baseUrl}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
            console.log(err)
        })
}

const getById = (token, reportId) => {
    const request = axios.get(`${baseUrl}/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
            console.log(err)
        })
}

const getAllUntreated = (token) => {
    const request = axios.get(`${baseUrl}/untreated`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
            console.log(err)
        })
}

const getAllUntreatedForAnnouncement = (token, announcementId) => {
    const request = axios.get(`${baseUrl}/untreated/${announcementId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
            console.log(err)
        })
}

const createOne = (token, report) => {
    const request = axios.post(`${baseUrl}`, report, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
        console.log(err)
    })
}

const block = (token, reportId) => {
    const request = axios.put(`${baseUrl}/block/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
        console.log(err)
    })
}

const close = (token, reportId) => {
    const request = axios.put(`${baseUrl}/unblock/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data).catch(err => {
        console.log(err)
    })
}

export default {getAll, getById, getAllUntreated, getAllUntreatedForAnnouncement,
 createOne, block, close}