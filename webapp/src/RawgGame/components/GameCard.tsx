import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Image,
  Spacer,
} from "@chakra-ui/react";
import useGame, { Game } from "./Hooks/useGame";
import { Skeleton, Badge } from "@chakra-ui/react";
import PlatformIcons from "./Platform-Icons";
import noImage from '../../assets/Images/no-image-placeholder-6f3882e0.webp'
import Rating from "./Hooks/Rating";
interface props {
  game: Game;
}


const GameCard = ({ game }: props) => {
  const { loading } = useGame();

  return (
    <Card variant="filled">
      <CardHeader borderRadius={"10px"} overflow={"hidden"}>
        {loading && (
          <Skeleton w={"100%"} h={"100%"}>
            <Card variant={'filled'} w={"100%"} height={"100%"}>
            <CardHeader>

                <Skeleton />
              </CardHeader>
              <CardFooter>
                <Skeleton />
              </CardFooter>
            </Card>
          </Skeleton>
        )}
        <Image
          src={!game.background_image ? noImage : game.background_image}
          borderRadius={"5px"}
          overflow={"hidden"}
          objectFit={"cover"}
          alt={game.name + " image"}
          maxH={600}
          maxW={400}
          />
      </CardHeader>
      {!loading && <CardBody>
        <HStack>
          <PlatformIcons
            platform={game.parent_platforms.map((p) => p.platform)}
          />
          <Spacer />
          <Badge p={2} color="green.100" fontSize={"14px"}>
            {game.metacritic}
          </Badge>
        </HStack>
        <Heading fontSize={"2xl"} m={2}>{game.name}<Rating rating={game.rating_top} /></Heading>
        {loading && <Skeleton w={"100%"} h={"100%"} />}

      </CardBody>}
      {loading && <CardFooter>
        <Skeleton />
      </CardFooter>}
    </Card>
  );
};

export default GameCard;
