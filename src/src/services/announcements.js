import axios from "axios";
const baseUrl = 'http://localhost:3000/api/announcements'

const getAll = () =>{

    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}


const getProductByCategoryId = (categoryId) =>{
    const request = axios.get(baseUrl+'?category='+categoryId)
    return request.then(response=>response.data)
}

const addNewAnnouncement = (announcement) => {
    console.log("New Announcement: ", announcement)
    const request = axios.post(baseUrl, announcement)
    return request.then(response => response.data)
}

export default {getAll, getProductByCategoryId, addNewAnnouncement}