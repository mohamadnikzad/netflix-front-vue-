export const getToken = () => {
    try {
        return localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))?.accessToken
            : ''
    } catch (error) {
        console.log(error)
    }
}
