import { Box } from "@chakra-ui/react";
import logo from "../../assets/Images/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-center pos-re">
        <div className="container">
          <a className="logo" href="#">
            <img src={logo} alt="logo" />
          </a>
          <div className="social">
            <a href="#0">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#0">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#0">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#0">
              <i className="fab fa-behance"></i>
            </a>
            <a href="#0">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
          <p>
            <a target="_blank" href="">
              Concept Technologies
            </a>
          </p>
        </div>

        <div className="curve curve-top curve-center"></div>
        <Box as="ul" listStyleType="circle" className="d-flex p-5">
          <li className="footer-list"></li>
          <li className="footer-list">
            <Link to="/support">Support</Link> {/* Updated to absolute path */}
          </li>
          <li className="footer-list">
            <Link to="/privacy">Privacy</Link> {/* Updated to absolute path */}
          </li>
        </Box>
      </footer>
    </>
  );
};

export default Footer;
