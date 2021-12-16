import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/offers'

const getFromMe = (token) => {
    const request = axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const getForMe = (token) => {
    const request = axios.get(`${baseUrl}/me/asSeller`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const getOffer = (token, offerId) => {
    const request = axios.get(`${baseUrl}/${offerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const getByAnnouncement = (token, announcementId) => {
    const request = axios.get(`${baseUrl}/byAnnouncement/${announcementId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const postAnnouncement = (token, offer) => {
    const request = axios.post(baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
    }, offer)
    return request.then(response => response.data)
}

const acceptOffer = (token, offerId) => {
    const request = axios.put(`${baseUrl}/accept/${offerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const refuseOffer = (token, offerId) => {
    const request = axios.put(`${baseUrl}/refuse/${offerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

export default {getFromMe, getForMe, getOffer, getByAnnouncement, postAnnouncement, acceptOffer, refuseOffer}