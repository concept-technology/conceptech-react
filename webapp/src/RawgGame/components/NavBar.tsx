import { HStack, Heading, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.webp";
import { ToggleColorMode } from "../../Home-page/components/ColorMode";
import SearchBar from "./Hooks/SearchBar";

interface props{
  onsearch: (searchRef:string)=>void
}
const NavBar = ({onsearch}:props) => {
  return (
    <HStack>
      <Image src={logo} w={"60px"} />
      <Heading>Rawg</Heading>
      <SearchBar onsearch={onsearch}/>
      <ToggleColorMode />
    </HStack>
  );
};

export default NavBar;
