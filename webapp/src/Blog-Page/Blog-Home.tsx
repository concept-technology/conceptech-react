
import Footer from "../Home-page/components/Footer"
import useNews from "./api-client"
import FeaturedNews from "./FeaturedNews"
import MenuBar from "./MenuBar"

import BlogSlide from "./SwiperSlide"




export const BlogHome = () => {
  const { data } = useNews()

  return (
  <>
    <MenuBar/>
    <BlogSlide/>
    <FeaturedNews/>
    <Footer/>
  </>


  )
}
export default BlogHome