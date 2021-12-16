import axios from 'axios'
const FormData = require('form-data');
const baseUrl = '/api/medias'

const getAnnouncementPhotosByUserId = (id) => {
    const request = axios.get(`${baseUrl}/announcement/${id}`)
    return request.then(response => response.data)
}

const uploadImage = (announcementId, image, token) => {
    const formData = new FormData();
    formData.append("image", image)
    const request = axios.post(`${baseUrl}/announcement/${announcementId}`, formData, {
        headers: { 
            "Content-Type": "multipart/form-data",
            "type": "formData",
            Authorization: `Bearer ${token}` }
    })
    return request.then (response => response.data)
}

export default {getAnnouncementPhotosByUserId, uploadImage}