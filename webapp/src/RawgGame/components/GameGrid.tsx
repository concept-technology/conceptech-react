import { SimpleGrid, Text } from "@chakra-ui/react";
import useGame from "./Hooks/useGame";
import GameCard from "./GameCard";
import { GameQuery } from "./GameApp";

interface props {
  gameQuery: GameQuery

}
const GameGrid = ({ gameQuery }: props) => {
  const { data, error } = useGame(gameQuery);
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      spacing={4}
      padding={"25px"}
    >
      {error && <Text>{error}</Text>}

      {data.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
