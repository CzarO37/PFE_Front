import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/medias'

const getAnnouncementPhotosByUserId = (id) => {
    const request = axios.get(`${baseUrl}/announcement/${id}`)
    return request.then(response => response.data)
}

const uploadImage = (announcementId, image, token) => {
    const request = axios.post(`${baseUrl}/announcement/${announcementId}`, image, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then (response => response.data)
}

export default {getAnnouncementPhotosByUserId, uploadImage}