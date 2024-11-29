import { GameQuery } from "../GameApp";
import useData from "./UseData";

export interface platform{
    id:  number;
    name: string,
    slug: string
}

export interface Game {
  id: number;
  name: string;
  background_image:string
  parent_platforms: {platform:platform}[]
  metacritic: string
  rating_top:number

}

const useGame = (gameQuery: GameQuery) =>
  useData<Game>('/games',
    {
      params: {
        genres: gameQuery?.genres?.id,
        platforms: gameQuery?.platform?.id,
        ordering: gameQuery?.sortOrder,
        search: gameQuery?.searchInput
      },
    },
    [gameQuery])


export default useGame