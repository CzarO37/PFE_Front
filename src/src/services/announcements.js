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
    .catch(err => {
        console.log(err)
    })
}

const getMe = (token) => {
    const request = axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
    .catch(err => {
        console.log(err)
    })
}

const getProductByCategoryId = (categoryId) =>{
    const request = axios.get(baseUrl+'?category='+categoryId)
    return request.then(response=>response.data)
}


const cancel = (announcementId, token) => {
    const request = axios.delete(`${baseUrl}/cancel/${announcementId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
    .catch(err => {
        console.log(err)
    })
}

const getXFirst = (numberOfFirstProducts) =>{
    const request = axios.get(baseUrl+'/number?number='+numberOfFirstProducts)
    return request.then(response => response.data)
}

const addNewAnnouncement = (announcement, token) => {
    console.log("New Announcement: ", announcement)
    const request = axios.post(baseUrl, announcement, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

export default {getAll, getById, getDetails, getProductByCategoryId, getXFirst, cancel, addNewAnnouncement, getMe}
