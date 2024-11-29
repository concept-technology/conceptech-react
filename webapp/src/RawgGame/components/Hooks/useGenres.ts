import useData from "./UseData";

interface genres_props{
  name: string
  id: number
  image_background: string
}


const useGenres = () => useData<genres_props>('/genres')

 
 export default useGenres