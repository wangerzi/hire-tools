import { getRequest } from './request'

export async function general() {
    return getRequest('/json/question/general.json')
}