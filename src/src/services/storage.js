
const storeToken = (token, isRememberMe) => {
    if(isRememberMe) {
        localStorage.setItem('token', token)
    }
    sessionStorage.setItem('token', token)
}

const getToken = () => {
    let token = sessionStorage.getItem('token')
    if(!token) {
        token = localStorage.getItem('token')
    }
    return token
}

const storeIntoSession = (item, name) => {
    sessionStorage.setItem(name, item)
}

const getFromSession = (name) => {
    return sessionStorage.getItem(name)
}

export default {storeToken, getToken, storeIntoSession, getFromSession}