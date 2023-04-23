import axios from 'axios'

let baseURL
if( process.env.NODE_ENV === 'production' ) {
    baseURL = 'http://0.0.0.0:80/'
} else {
    baseURL = 'http://localhost:80/'
}

// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.request.use((config) => {
    config.headers['Accept'] = '*'
    config.baseURL = baseURL
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getAxios({
    url,
    params={}
}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err, '1')
            reject(err)
        })
    })
}

// axios的post请求
export function postAxios({
    url,
    data
}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default axios