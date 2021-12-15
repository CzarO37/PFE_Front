
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
    sessionStorage.setItem("user", user)
}

const getUser = () => {
    return sessionStorage.getItem("user")
}

export default {storeToken, getToken, storeUser, getUser}