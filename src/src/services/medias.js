import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/medias'

const getAnnouncementPhotosByUserId = (id) => {
    const request = axios.post(`${baseUrl}/announcement/${id}`)
    return request.then(response => response.data)
}

export default {getAnnouncementPhotosByUserId}