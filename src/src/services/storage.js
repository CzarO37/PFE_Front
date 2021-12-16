
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

const storeUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user))
}

const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"))
}

const clearStorage = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
}

export default {storeToken, getToken, storeUser, getUser, clearStorage}
