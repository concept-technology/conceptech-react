import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Container,
  Divider,
  Input,
  Button,

} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-scroll";
import MenuBar from "./MenuBar";
import { useEffect, useState } from "react";
import apiClient from "../authentication/ApiClint";
import Footer from "../Home-page/components/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactPlayer from "react-player";
import VideoPlayer from "./VideoPlayer";

interface videoProps{
  id: number
  title:string
  url: string

}
const BlogDetail = () => {
  const { id, slug } = useParams();
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("")

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    codeSnippets: [],
    images:[],
    videos:[]
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await apiClient.get(`/api/blog/${id}/${slug}/`);
        const data = blog.data;
        setBlog({
          title: data.title,
          content: data.content,
          images: data.images.map((img:any) => img.image),
          codeSnippets: data.code_snippets,
          videos: data.videos
        });
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch blog data", error);
      }
    };

    fetchBlog();
  }, [id, slug]);


  const mergeContentAndImages = (content, images,) => {
    const paragraphs = content.split(".");
    const mergedContent = [];
  
    const maxLength = Math.max(paragraphs.length, images.length,);
  
    for (let i = 0; i < maxLength; i++) {
      if (i < paragraphs.length && paragraphs[i].trim()) {
        mergedContent.push({ type: "paragraph", value: paragraphs[i].trim() });
      }
      if (i < images.length) {
        mergedContent.push({ type: "image", value: images[i] });
      }
  
    }
  
    return mergedContent;
  };
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  const relatedStories = [
    { title: "Story 1", description: "A short description of Story 1" },
    { title: "Story 2", description: "A short description of Story 2" },
    { title: "Story 3", description: "A short description of Story 3" },
    { title: "Story 4", description: "A short description of Story 4" },
  ];

  return (
      <>
    <Container maxW="1200px" mx="auto" p={5}>
      <MenuBar />

      <Flex direction={["column", "column", "row"]} gap={8}>
        {/* Blog Content */}
        <Box flex={3} bg="white" p={5} borderRadius="lg" boxShadow="lg">
          {blog && (
            <VStack spacing={8} align="start">
              <Heading fontSize="4xl" color="blue.600">
                {blog.title}
              </Heading>
                    {/* Video Section */}
      {blog.videos  && (
          <VideoPlayer videos={blog.videos} />
      )}

              {mergeContentAndImages(blog.content, blog.images,)?.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <Text key={index} fontSize="lg" color="gray.800" mb={4}>
                      {block.value}
                    </Text>
                  );
                }

                if (block.type === "image") {
                  return (
                    <Image
                      key={index}
                      src={block.value}
                      alt={`Blog Image ${index + 1}`}
                      w="100%"
                      h="auto"
                      borderRadius="lg"
                      boxShadow="md"
                      mb={4}
                      objectFit='cover'
                    />
                  );
                }
    
                return null;
              })}
                    {/* Code Snippets */}
                    {blog.codeSnippets.length > 0 && (
        <Box w={{base:'90%', lg:'500px'}}>
          <Heading fontSize="2xl" color="teal.500" mb={4}>
            Code Snippets
          </Heading>
          {blog.codeSnippets.map((snippet) => (
            <Box key={snippet.id} mb={8} p={4} border="1px solid #e2e8f0" borderRadius="md">
              <Heading fontSize="lg" color="gray.700" mb={2}>
                {snippet.title}
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={2}>
                {snippet.explanation}
              </Text>
              <SyntaxHighlighter language={snippet.language} style={materialOceanic}>
                {snippet.code}
              </SyntaxHighlighter>
            </Box>
          ))}
        </Box>
      )}
            </VStack>
            
            
          )}

          {/* Comments Section */}
          <Divider my={6} />
          <Heading fontSize="2xl" color="blue.600" mb={4}>
            Comments
          </Heading>
          <VStack spacing={4} align="start">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Box key={index} bg="gray.100" p={3} borderRadius="md" w="100%">
                  {comment}
                </Box>
              ))
            ) : (
              <Text color="gray.600">No comments yet. Be the first to comment!</Text>
            )}
          </VStack>
          <Flex mt={4} gap={2}>
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleAddComment}>
              Add
            </Button>
          </Flex>
        </Box>

        {/* Related Stories */}
        <Box flex={1} bg="white" p={5} borderRadius="lg" boxShadow="lg">
          <Heading fontSize="xl" color="blue.600" mb={4}>
            Related Stories
          </Heading>
          <VStack spacing={4} align="stretch">
            {relatedStories.map((story, index) => (
              <Box
                key={index}
                p={4}
                bg="gray.50"
                borderRadius="lg"
                boxShadow="md"
                _hover={{ bg: "gray.100", cursor: "pointer" }}
              >
                <Heading fontSize="md" color="blue.500">
                  {story.title}
                </Heading>
                <Text color="gray.600" mt={2}>
                  {story.description}
                </Text>
                <Link
                  to="top"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  style={{ color: "blue.400", marginTop: "10px", display: "block" }}
                >
                  Read More
                </Link>
              </Box>

            ))}
          </VStack>

          
        </Box>
      </Flex>
    </Container>
    <Footer/>
    </>
  );
};

export default BlogDetail;
