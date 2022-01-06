import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './getToken'

export const fetcher = async (
    url: string,
    params?: object,
    query?: object
): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers: {
            token: `Bearer ${await getToken()}`,
        },
    }
    if (getToken())
        return await axios
            .get(url, config)
            .then((res) => res.data)
            .catch((err) => console.log(err))
}
