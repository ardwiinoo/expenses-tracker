import axios from 'axios'

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    withCredentials: true,
})

http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            document.cookie = 'token=; Max-Age=0; path=/'
            window.location.href = '/auth/signin'
        }
        return Promise.reject(err)
    }
)

export default http
