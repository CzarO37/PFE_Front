const getUserLocalStorage = () => {
    return localStorage.getItem('user')
}

const setUserLocalStorage = (token) => {
    return localStorage.setItem('user',token)
}

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default {getUserLocalStorage,setUserLocalStorage,parseJwt}