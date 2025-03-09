import {
  Box,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import BlogHeader from "./BlogHeader";
import BlogCard from "./BlogCard";
import BlogSlide from "./SwiperSlide";
import RightBlogCard from "./RightBlogCard";
import Footer from "../Home-page/components/Footer";
import Categories from "./Categories";
import useFetch from "../hooks/useFetch";
import { Blog } from "../hooks/useBlog";

const BlogHome = () => {
  const { data = [] } = useFetch<Blog>("/api/blog/",); // Ensure data is initialized to an empty array

  return (
    <>
      {/* Main Grid Layout */}
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        gap={6}
        px={{ base: 4, lg: 8 }}
      >
        {/* Header */}
        <GridItem area="nav">
          <BlogHeader />
        </GridItem>

        {/* Sidebar - Only visible on large screens */}
        <Show above="lg">
          <GridItem area="aside" p={4} borderRadius="md">
            <Categories />
          </GridItem>
        </Show>

        {/* Main Content */}
        <GridItem area="main">
          {data.length > 0 ? (
            <>
              {/* Featured Blog Slide */}
              <SimpleGrid columns={{ base: 1, lg: 4 }} gap={6} mb={8}>
                <GridItem colSpan={{ base: 1, lg: 3 }}>
                  <BlogSlide BlogProps={data} />
                </GridItem>
                <GridItem>
                  <RightBlogCard BlogProps={data} />
                </GridItem>
              </SimpleGrid>

              {/* Blog Cards */}
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
                gap={6}
                spacingY={10}
              >
                {data.map((blog) => (
                  <BlogCard cardContents={blog} key={blog.id} />
                ))}
              </SimpleGrid>
            </>
          ) : (
            <Box textAlign="center" py={10}>
              <Heading>No blogs found</Heading>
            </Box>
          )}
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default BlogHome;
