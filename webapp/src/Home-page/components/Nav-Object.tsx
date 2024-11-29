
import { FcAbout, FcCellPhone, FcNews } from "react-icons/fc";
import { AiFillProject } from "react-icons/ai";

import { FaAppStoreIos } from "react-icons/fa6";
interface NavItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}


// interface NavBarProps {
//   navbar: NavItem[];
// }

export const NavObject: NavItem[] = [
  {
    text: "About",
    icon: <FcAbout />,
    id: 0,
    link: '#about'
  },
  {
    text: "Blog",

    icon: <FcNews />,
    id: 1,
    link: "blog",
  },
  {
    text: "Contact",
    icon: <FcCellPhone />,
    id: 2,
    link: '#contact'
  },
  {
    text: "Apps",
    icon: <FaAppStoreIos/>,
    id: 3,
    link: '/project'
  },
];

export default NavObject;
