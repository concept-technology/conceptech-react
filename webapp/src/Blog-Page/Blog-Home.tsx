
import Footer from "../Home-page/components/Footer"
import useBlog from "./api-client"

import FeaturedNews from "./FeaturedNews"
import MenuBar from "./MenuBar"

import BlogSlide from "./SwiperSlide"




export const BlogHome = () => {
  const { data } = useBlog()

  return (
  <>
    <MenuBar/>
    <BlogSlide BlogProps={data}/>
    <FeaturedNews/>
    <Footer/>
  </>


  )
}
export default BlogHome