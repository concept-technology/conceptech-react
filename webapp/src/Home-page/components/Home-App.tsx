
import About_us from './About_us'
import BlogSection from './BlogSection'
import CarouselComponent from './Carousel'
import ContactForm from './ContactForm'
import Footer from './Footer'
import ImageSection from './ImageSection'
import NavObject from './Nav-Object'
import NavBar from './NavBar'
import ProcessSection from './Process'

const HomeApp = () => {


    return (
    <>
        {/* <NavBar navbar={NavObject}/>     */}
        <CarouselComponent/>
        <ProcessSection/>
        <About_us/>
        <ImageSection/>
        <BlogSection/>
        <ContactForm/>
        <Footer/>
    </>
)
}
export default HomeApp