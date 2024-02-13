import { API_CONFIG, CONFIG } from "../config/index.js"
import request from "../utils/request.js"

export const login = (username, password) => {
    return request(API_CONFIG.loginApi, {username, password}, 'post')
}

export const logout = () => {
    return request(API_CONFIG.logoutApi, {}, 'get')
}