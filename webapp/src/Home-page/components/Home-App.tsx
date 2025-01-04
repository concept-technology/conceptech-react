
import { SITE_DOMAIN } from '../../authentication/ApiClint'
import PrivateRoute from '../../authentication/PrivateRoutes'
import useBlog from '../../Blog-Page/hooks/useBlog'
import useFetch from '../../Blog-Page/hooks/useFetch'
import DigitalProductsList from '../../products/DiditalProducts'
import useProduct from '../../products/hook/useProduct'
import ProductsCard from '../../products/ProductsCard'
import About_us from './About_us'
import BlogSection from './BlogSection'
import CarouselComponent from './Carousel'
import Footer from './Footer'
import HomePage from './HomePge'
import ImageSection from './ImageSection'
import ProcessSection from './Process'



interface Product{
      name:string
      description: string
      discount_price: number
      features: [],
      is_active: boolean,
    };

  

  
const HomeApp = () => {
    const {data:products} = useFetch<Product>(`/api/products/view/`)
    return (
    <>
        <CarouselComponent/>
        <HomePage/>
        <ProductsCard product={products}/>
        <ProcessSection/>
        <About_us/>
        
        <ImageSection/>
        <BlogSection/>

        <Footer/>
    </>
)
}
export default HomeApp