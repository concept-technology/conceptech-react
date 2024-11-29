import { ReactNode, useEffect, useState } from "react";
import ApiClient from "../../Services/Api-Client";
import { AxiosRequestConfig, CanceledError } from "axios";


export interface genres_props {
    name: string
    id: number
    image_background: string
}
export interface fetchResData<T> {
    count: number
    genres: genres_props[]
    results: T[]
}
export interface ErrorResponse {
    err: () => void
    error: string
    message: string

}

const useData = <T>(endpoint: string, requestCongig?: AxiosRequestConfig, dependency?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<ErrorResponse | string | ReactNode>();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const Controller = new AbortController()
        ApiClient.get<fetchResData<T>>(endpoint, { signal: Controller.signal, ...requestCongig })
            .then((response) => {
                setLoading(false)
                setData(response.data.results)
            })
            .catch((err: ErrorResponse) => {
                if (err instanceof CanceledError) return
                setError(err.message)
                setLoading(false)
            });
        return () => Controller.abort()
    }, dependency ? [...dependency] : []);
    return { data, error, loading }
}

export default useData