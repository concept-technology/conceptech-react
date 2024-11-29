import useData from "./UseData"

export interface platform {
    id: number
    name: string
    slug: string
}
const usePlatform = () => useData<platform>('/platforms/lists/parents');

export default usePlatform