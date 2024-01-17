import axios from "axios"
import { CONFIG } from "../config/index.js"

axios.interceptors.request.use(
    config => {
        // get请求添加timestamp params
        if (config.method === 'get') {
            let timeStamp = (new Date()).getTime()
            if (config.params) {
                config.params.t = timeStamp
            } else {
                config.params = {
                    t: timeStamp
                }
            }
        }
        // try {
        //     const value = window.localStorage.getItem(CONFIG)
        // } catch (error) {
        //     value = ""
        // }
        let TokenValue = window.localStorage.getItem(CONFIG.TOKEN_NAME)
        if (TokenValue != null || TokenValue != "") {
            config.headers[CONFIG.TOKEN_NAME] = 'Bearer ' + TokenValue
        } else {
            console.log('none token')
        }
         
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

const request = (url = '', data={}, method = 'get', timeout = 5000 ) => {
    return new Promise((resolve, reject) => {
        const methodLower = method.toLowerCase()
        // console.log(import.meta.env)
        // let xxx = import.meta.env.VITE_APP_BASE_API
        // console.log(xxx)
        if (methodLower === 'get' ) {
            axios({
                baseURL: import.meta.env.VITE_APP_BASE_API,
                url: url,
                method: methodLower,
                params: data,
                timeout: timeout
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        } else {
            axios({
                baseURL: import.meta.env.VITE_APP_BASE_API,
                url: url,
                method: methodLower,
                data: data,
                timeout: timeout
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        }
    })
    
}

export default request