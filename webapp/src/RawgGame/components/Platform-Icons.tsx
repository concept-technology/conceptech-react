import { HStack, Icon } from "@chakra-ui/react";
import { platform } from "./Hooks/useGame";
import { AiFillWindows } from "react-icons/ai";
import { IconType } from "react-icons";
import { SiNintendo } from "react-icons/si";
import {
  BsGlobeEuropeAfrica,
  BsAndroid2,
  BsApple,
  BsPlaystation,
  BsXbox,
} from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { DiLinux } from "react-icons/di";

interface props {
  platform: platform[];
}

const PlatformIcons = ({ platform }: props) => {
  const icons: { [key: string]: IconType } = {
    pc: AiFillWindows,
    web: BsGlobeEuropeAfrica,
    android: BsAndroid2,
    ios: MdPhoneIphone,
    mac: BsApple,
    linux: DiLinux,
    playstation: BsPlaystation,
    xbox: BsXbox,
    nintendo: SiNintendo,
  };
  return (
    <HStack>
      {platform.map((platform) => (
        <Icon
          key={platform.id}
          as={icons[platform.slug]}
          color="gray.500"
          my={2}
        />
      ))}
    </HStack>
  );
};

export default PlatformIcons;
