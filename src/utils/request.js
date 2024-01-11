import axios from "axios"

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
        if (methodLower === 'get' ) {
            axios({
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