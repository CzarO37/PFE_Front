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

const postOffer = (token, offer) => {
    console.log(token);
    console.log(offer)
    const request = axios.post(baseUrl, offer, {
        headers: { 'Authorization': `Bearer ${token}` }   
    })
    return request.then(response => response.data).catch((e) => alert(e.response.statusText))
}

const acceptOffer = (token, offerId) => {
    const request = axios.put(`${baseUrl}/accept/${offerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const refuseOffer = (token, offerId) => {
    const request = axios.put(`${baseUrl}/refuse/${offerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

export default {getFromMe, getForMe, getOffer, getByAnnouncement, postOffer, acceptOffer, refuseOffer}