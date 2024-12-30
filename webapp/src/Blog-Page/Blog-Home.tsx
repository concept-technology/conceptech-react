import { Grid, GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import BlogHeader from "./BlogHeader";
import BlogCard from "./BlogCard";
import BlogSlide from "./SwiperSlide";
import RightBlogCard from "./RightBlogCard";
import useBlog from "./hooks/useBlog";
import Footer from "../Home-page/components/Footer";
import Categories from "./Categories";

const BlogHome = () => {
  const { data = [] } = useBlog("/api/blog/"); // Provide a default value to prevent errors if data is undefined

  return (
    <>
      {/* Main Grid Layout */}
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        mt={{ base: "6px", lg: "50px" }}
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
            <Categories/>
          </GridItem>
        </Show>

        {/* Main Content */}
        <GridItem area="main">
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
        </GridItem>
      </Grid>
      <Footer/>
    </>
  );
};

export default BlogHome;
