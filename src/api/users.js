import { API_CONFIG, CONFIG } from "../config/index.js"
import request from "../utils/request.js"

export const getUsersList = () => {
    return request(API_CONFIG.userAPI, {}, 'get')
}

export const deleteUser = (id) => {
    let url = API_CONFIG.userAPI + id + '/'
    return request(url, {}, 'delete')
}

export const createUser = (userFrom) => {
    let url = API_CONFIG.userAPI
    return request(url, userFrom, 'post') 
}

export const updateUser = (userFrom) => {
    let url = API_CONFIG.userAPI + userFrom.id + '/'
    return request(url, userFrom, 'put') 
}
