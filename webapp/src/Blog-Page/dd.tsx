import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch"; // Import the custom hook
import apiClient from "../api/authApi";
import Cookies from "js-cookie";
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
  Spinner,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  useDisclosure,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaComments, FaCopy, FaFacebook, FaThumbsUp, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import VideoPlayer from "./VideoPlayer";
import BlogHeader from "./BlogHeader";
import Footer from "../Home-page/components/Footer";

// Interfaces
interface RelatedBlogProps {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
}

interface Comment {
  id: number;
  user: string;
  content: string;
  created_at: string;
  profile_picture?: string;
}

interface CodeSnippet {
  id: number;
  code: string;
  created_at: string;
  explanation: string;
  title: string;
}

interface ImgProps {
  id: number;
  image: string;
  uploaded_at: string;
}

interface BlogProps {
  title: string;
  content: string;
  images: ImgProps[];
  comments: Comment[];
  codeSnippets: CodeSnippet[];
  videos: any[];
}

const BlogDetail = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentText, setCommentText] = useState("");
  const token = Cookies.get("access") || "";

  // **Fetch blog details**
  const { data: blog, loading: loadingBlog } = useFetch<BlogProps>(`/api/blog/${id}/${slug}/`);
  console.log('blog fetched',blog)
  // **Fetch related blogs**
  const { data: relatedStories, loading: loadingRelated } = useFetch<RelatedBlogProps>(`/api/blog/related/${id}`);

  // **Fetch comments**
  const { data: comments, setData: setComments } = useFetch<Comment>(`/api/blog/comments/list/${id}/`);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await apiClient.post(
        `/api/blog/comments/create/${id}/`,
        { content: commentText },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      setComments((prevComments) => [...prevComments, response.data.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Box>
      <BlogHeader />
      <Button onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack />
      </Button>
      <Container maxW="1200px" mx="auto" p={5}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Blog Content */}
          <Box flex={3} bg="white" p={5} borderRadius="lg" boxShadow="lg">
            {loadingBlog ? (
              <Spinner />
            ) : blog ? (
              <VStack spacing={8} align="start">
                <Heading fontSize="4xl" color="blue.600">
                  {blog.title}
                </Heading>
                {blog.videos  && <VideoPlayer videos={blog.videos} />}
                {blog.images && blog.images.map((img, index) => (
                  <Image key={index} src={img.image} alt={`Blog Image ${index + 1}`} w="100%" h="auto" borderRadius="lg" boxShadow="md" />
                ))}
              </VStack>
            ) : (
              <Text>Blog not found.</Text>
            )}

            <Divider my={6} />
            
            {/* Comments Section */}
            <Flex align="center" justify="space-between" mb={4}>
              <Heading fontSize="2xl" color="blue.600">
                Comments
              </Heading>
              <IconButton icon={<FaComments />} colorScheme="blue" onClick={onOpen} aria-label="View Comments" />
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4} align="start">
                    {comments  ? (
                      comments.map((comment, index) => (
                        <Stack key={index} direction="row" h="20">
                          <Avatar name={comment.user} src={comment.profile_picture || undefined} size="md" mr={4} />
                          <Box bg="gray.100" p={3} borderRadius="md" w="100%">
                            <Heading size="sm">{comment.user}</Heading>
                            <Text color="gray.700">{comment.content}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </Text>
                          </Box>
                        </Stack>
                      ))
                    ) : (
                      <Text color="gray.600">No comments yet. Be the first to comment!</Text>
                    )}
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Flex mt={4} gap={2} align="center">
              <Input placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <Button colorScheme="blue" onClick={handleCommentSubmit}>
                Add
              </Button>
            </Flex>
          </Box>

          {/* Related Stories */}
          <Box flex={1} bg="white" p={5} borderRadius="lg" boxShadow="lg">
            {
              relatedStories && 
            <Heading fontSize="xl" color="blue.600" mb={4}>
              Related Stories
            </Heading>
            }
            {loadingRelated ? (
              <Spinner />
            ) : (
              <VStack spacing={4} align="stretch">
                {relatedStories && relatedStories.map((story) => (
                  <RouterLink key={story.id} to={`/blog/${story.id}/${story.slug}`}>
                    <Box p={4} bg="gray.50" borderRadius="lg" boxShadow="md" _hover={{ bg: "gray.100", cursor: "pointer" }}>
                      <Image src={story.image} alt={story.title} w="100%" h="150px" objectFit="cover" borderRadius="md" mb={2} />
                      <Heading fontSize="md" color="blue.500">
                        {story.title}
                      </Heading>
                    </Box>
                  </RouterLink>
                ))}
              </VStack>
            )}
          </Box>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default BlogDetail;
