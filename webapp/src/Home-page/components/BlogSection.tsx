import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';
import useBlog from '../../Blog-Page/hooks/useBlog';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const BlogSection = () => {
    const {data} = useBlog('/api/latest/blogs/')
  return (
    <Box py={16} bg="gray.50" data-scroll-index="5">
      <Box maxW="7xl" mx="auto" px={4}>
        <Flex direction="column" align="center" mb={16}>
          <Box textAlign="center" maxW="lg">
            <Heading as="h4" size="lg" mb={4}>
              <Text as="span" color="teal.500">
                Latest
              </Text>{' '}
              News
            </Heading>
            <Text color="gray.600" fontSize="lg">
              At Concept Technology and Software Solutions, we believe in staying ahead of the curve when it comes to technology, innovation, and business solutions. Our blog is designed to provide valuable insights, tips, and updates for businesses, developers, and tech enthusiasts looking to harness the power of the digital world.
            </Text>
          </Box>
        </Flex>

        <Flex direction={{ base: 'column', lg: 'row' }} justify="center" align="flex-start" >
            {data.map(blog=> 
          <Box maxW="sm" bg="white" borderRadius="md" boxShadow="lg" overflow="hidden" key={blog.id}>
            <Image src={blog.image} alt="Blog post" objectFit="cover" boxSize="full" />
            <Box p={6}>
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Link to={`blog/${blog.id}/${blog.slug}`} color="teal.500" >{blog.author}</Link>
                <Link to={`blog/${blog.id}/${blog.slug}`} color="teal.500" >{formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}
                </Link>
                <Link to={`blog/${blog.id}/${blog.slug}`} color="teal.500">{blog.category.title}</Link>
              </Box>
              <Heading as="h6" size="md" mb={3}>
                <Link to={`blog/${blog.id}/${blog.slug}`}>{blog.title}</Link>
              </Heading>
              <Text color="gray.600" fontSize="md" mb={4}>
                {blog.description}
              </Text>
              <Link to={`blog/${blog.id}/${blog.slug}`} color="teal.500">
                Read More <Box as="span" ml={2}>&#8594;</Box>
              </Link>
            </Box>
          </Box>
        )}
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogSection;
