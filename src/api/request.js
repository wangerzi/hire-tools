import axios from 'axios'

function handleAxios(request) {
    return new Promise(((resolve, reject) => {
        request.then(r => {
            if (r.data.code === undefined || r.data.code !== 0) {
                reject(r.data.message)
            }
            resolve(r.data)
        }).catch(e => {
            reject(e)
        });
    }))
}

export async function getRequest(url, params) {
    return handleAxios(axios.get(url, {
        params
    }))
}

export async function postRequest(url, params, data) {
    return handleAxios(axios.get(url, {
        params,
        data,
    }))
}

