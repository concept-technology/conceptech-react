import { Card, CardBody, CardHeader, Heading, Img } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Blog } from '../hooks/useBlog';






export interface fetchBlogs{
  cardContents:Blog
}
const BlogCard = ({ cardContents }:fetchBlogs) => {
    const navigate = useNavigate();
    
  
  return(
    <>
        <Card maxW="sm" overflow="hidden" size='sm'borderRadius={10} onClick={()=>navigate(`/blog/${cardContents.id}/${cardContents.slug}`)} cursor='pointer'>
          <CardHeader>
            <Img src={cardContents.image}/>
          </CardHeader>
          <CardBody>
            <Heading fontSize='2xl'>{cardContents.title}</Heading>
          </CardBody>
        </Card>

  </>
  )
}
export default BlogCard