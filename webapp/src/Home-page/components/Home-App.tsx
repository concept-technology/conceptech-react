
import PrivateRoute from '../../authentication/PrivateRoutes'
import About_us from './About_us'
import BlogSection from './BlogSection'
import CarouselComponent from './Carousel'
import ContactForm from './ContactForm'
import Footer from './Footer'
import HomePage from './HomePge'
import ImageSection from './ImageSection'
import ProcessSection from './Process'

const HomeApp = () => {
    return (
    <>
        <CarouselComponent/>
        <HomePage/>
        <ProcessSection/>
        <About_us/>
        <ImageSection/>
        <BlogSection/>

        <Footer/>
    </>
)
}
export default HomeApp