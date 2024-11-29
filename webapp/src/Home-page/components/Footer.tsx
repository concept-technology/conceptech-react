
import logo from '../../assets/Images/logo.jpg'
const Footer = () => {
return(
<>
<footer className="text-center pos-re">
    <div className="container">
        
        <a className="logo" href="#">
            <img src={logo} alt="logo"/>          
        </a>
        
        <div className="social">
            <a href="#0"><i className="fab fa-facebook-f"></i></a>
            <a href="#0"><i className="fab fa-twitter"></i></a>
            <a href="#0"><i className="fab fa-linkedin-in"></i></a>
            <a href="#0"><i className="fab fa-behance"></i></a>
            <a href="#0"><i className="fab fa-pinterest-p"></i></a>
        </div>

        <p><a target="_blank" href="">Concept Technologies</a></p>
    </div>

    <div className="curve curve-top curve-center"></div>
</footer>
</>

)
}
export default Footer