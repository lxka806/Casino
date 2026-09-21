import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export const registerUser = async (userData) => {
    const response = await api.post("/api/auth/register", userData)
    return response.data
}

export const login = async (userData) => {
    const response = await api.post("/api/auth/login", userData)
    return response.data
}

export const getProfile = async () => {
    const response = await api.get("/api/auth/profile")
    return response.data
}

export const logoutUser = async () => {
    const response = await api.post("/api/auth/logout")
    return response.data
}

export default api