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
  Tooltip,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  FaThumbsUp,
  FaShareAlt,
  FaRegSmile,
  FaReply,
  FaCopy,
} from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MenuBar from "./MenuBar";
import apiClient from "../authentication/ApiClint";
import Footer from "../Home-page/components/Footer";
import Cookies from "js-cookie";
import VideoPlayer from "./VideoPlayer";
import { formatDistanceToNow } from "date-fns";

interface RelatedBlogProps {
  id: number;
  title: string;
  slug: string;
  img: string;
  description: string;
}

interface Comment {
  id: number;
  user: string;
  content: string;
  created_at: string;
  profile_picture?: string;
  parent_id?: number | null; // For replies
}

const BlogDetail = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    codeSnippets: [],
    images: [],
    videos: [],
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedStories, setRelatedStories] = useState<RelatedBlogProps[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [reactions, setReactions] = useState<{ emoji: string; count: number }[]>([]);
  
  const [replyInputVisible, setReplyInputVisible] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/api/blog/${id}/${slug}/`);
        const data = response.data;
        setBlog({
          title: data.title,
          content: data.content,
          images: data.images.map((img: any) => img.image),
          codeSnippets: data.code_snippets,
          videos: data.videos,
        });
      } catch (error) {
        console.error("Failed to fetch blog data", error);
      }
    };
    fetchBlog();
  }, [id, slug]);

  useEffect(() => {
    const fetchRelatedStories = async () => {
      setLoadingRelated(true);
      try {
        const response = await apiClient.get(`/api/blog/related/${id}/`);
        setRelatedStories(response.data);
      } catch (error) {
        console.error("Failed to fetch related stories", error);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelatedStories();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/api/blog/comments/list/${id}/`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleLike = () => setLikes((prev) => prev + 1);

  const handleReaction = (emoji: string) => {
    setReactions((prev) => {
      const reactionIndex = prev.findIndex((r) => r.emoji === emoji);
      if (reactionIndex > -1) {
        const updated = [...prev];
        updated[reactionIndex].count += 1;
        return updated;
      }
      return [...prev, { emoji, count: 1 }];
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleReplyToggle = (commentId: number) => {
    setReplyInputVisible((prev) => (prev === commentId ? null : commentId));
  };

  const onSubmit = async (data: { content: string }) => {
    const token = Cookies.get("access");
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await apiClient.post(
        `/api/blog/comments/create/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComments((prevComments) => [...prevComments, response.data.comment]);
      reset();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Container maxW="1200px" mx="auto" p={5}>
      <MenuBar />
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Box flex={3} bg="white" p={5} borderRadius="lg" boxShadow="lg">
          <VStack spacing={8} align="start">
            <Heading fontSize="4xl" color="blue.600">
              {blog.title}
            </Heading>
            {blog.videos && <VideoPlayer videos={blog.videos} />}
            {blog.content.split("\n").map((paragraph, index) => (
              <Text key={index} fontSize="lg" color="gray.800">
                {paragraph}
              </Text>
            ))}
            <Flex gap={4} mt={4}>
              <Tooltip label="Like">
                <IconButton
                  icon={<FaThumbsUp />}
                  colorScheme="blue"
                  onClick={handleLike}
                  aria-label="Like"
                />
              </Tooltip>
              <Tooltip label="Share">
                <Flex gap={2}>
                  <FacebookShareButton url={window.location.href}>
                    <FaShareAlt />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <FaShareAlt />
                  </TwitterShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <FaShareAlt />
                  </WhatsappShareButton>
                </Flex>
              </Tooltip>
              <Tooltip label="Copy Link">
                <IconButton
                  icon={<FaCopy />}
                  colorScheme="green"
                  onClick={handleCopyLink}
                  aria-label="Copy Link"
                />
              </Tooltip>
            </Flex>
            <Flex gap={2}>
              {reactions.map((reaction) => (
                <Text key={reaction.emoji}>
                  {reaction.emoji} {reaction.count}
                </Text>
              ))}
            </Flex>
          </VStack>
          <Divider my={6} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex mt={4} gap={2}>
              <Input
                placeholder="Write a comment..."
                {...register("content", { required: true })}
              />
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </Flex>
          </form>
          <VStack mt={4} spacing={4}>
            {comments.map((comment) => (
              <Box key={comment.id} bg="gray.100" p={3} borderRadius="md" w="100%">
                <Stack direction="row" align="start">
                  <Avatar name={comment.user} src={comment.profile_picture} />
                  <Box>
                    <Text fontWeight="bold">{comment.user}</Text>
                    <Text>{comment.content}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </Text>
                    
                    
                    <Button
                      size="sm"
                      mt={2}
                      leftIcon={<FaReply />}
                      onClick={() => handleReplyToggle(comment.id)}
                    >
                      Reply
                    </Button>
                    {replyInputVisible === comment.id && (
                      <Flex mt={2}>
                        <Input placeholder="Write a reply..." />
                        <Button colorScheme="blue" ml={2}>
                          Reply
                        </Button>
                      </Flex>
                    )}
                  </Box>
                </Stack>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box flex={1} bg="white" p={5} borderRadius="lg" boxShadow="lg">
          <Heading fontSize="xl" color="blue.600" mb={4}>
            Related Stories
          </Heading>
          {loadingRelated ? (
            <Spinner />
          ) : (
            <VStack spacing={4} align="stretch">
              {relatedStories.map((story) => (
                <Box key={story.id} p={4} bg="gray.50" borderRadius="lg">
                  <RouterLink to={`/blog/${story.id}/${story.slug}`}>
                    <Image
                      src={story.img}
                      alt={story.title}
                      w="100%"
                      h="150px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Heading fontSize="md" color="blue.500">
                      {story.title}
                    </Heading>
                    <Text color="gray.600" mt={2}>
                      {story.description}
                    </Text>
                  </RouterLink>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Flex>
      <Footer />
    </Container>
  );
};

export default BlogDetail;
