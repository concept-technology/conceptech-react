
import { useGetProductsQuery } from '../../app/services/auth/authService'
import { token } from '../../authentication/ApiClint'
import useFetch from '../../hooks/useFetch'

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
    // const {data:products} = useFetch<Product>(`/api/products/view/`)
    const { data: products,  } = useGetProductsQuery('products');

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