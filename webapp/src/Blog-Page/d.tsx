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
  import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import Footer from "../Home-page/components/Footer";
  import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
  import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
  import Cookies from "js-cookie";
  import VideoPlayer, { VideoProps } from "./VideoPlayer";
  import { FaComments, FaCopy, FaFacebook, FaThumbsUp, FaWhatsapp } from "react-icons/fa";
  import { formatDistanceToNow } from 'date-fns';
  import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
  import { BsTwitterX } from "react-icons/bs";
  import BlogHeader from "./BlogHeader";
  import { IoMdArrowRoundBack } from "react-icons/io";
  import apiClient from "../api/authApi";
  
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
  
  
  interface code{
    code: string
    created_at:string
    explanation: string
    id:number
    title:string
    }
    
  interface imgprops{
    id: number
    image:string
    uploaded_at: string
  }
  
  interface props{
    title: string
    images: imgprops[]
    comments: Comment[]
    codeSnippets:code[]
    videoss:VideoProps[]
  }
  
  
  const BlogDetail = () => {
    const { id, slug } = useParams<{ id: string; slug: string }>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [relatedStories, setRelatedStories] = useState<RelatedBlogProps[]>([]);
    const [blog, setBlog] = useState<props>({
      title: "",
      content: "",
      codeSnippets: [],
      images: [],
      videos: [],
    });
    const [loadingRelated, setLoadingRelated] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<{ content: string }>();
  
    const navigate = useNavigate()
    const url =`/api/blog/${id}/${slug}/`
  
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const response = await apiClient.get(url);
          const data = response.data;
          console.log(data)
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
          const response = await apiClient.get();
          setRelatedStories(response.data);
        } catch (error) {
          console.error("Failed to fetch related blog", error);
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
        const newComment = response.data.comment;
        setComments((prevComments) => [...prevComments, newComment]);
        console.log(response.data)
        reset();
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    };
  
    const mergeContentAndImages = (content: string, images: string[]) => {
      const paragraphs = content.split(".");
      const mergedContent = [];
      const maxLength = Math.max(paragraphs.length, images.length);
  
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
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    };
  
    return (
      <Box>
      <BlogHeader/>
      <Button onClick={()=>navigate(-1)}>
      <IoMdArrowRoundBack />
  
      </Button>
        <Container maxW="1200px" mx="auto" p={5}>
          <Flex direction={{ base: "column", md: "row" }} gap={8}>
            <Box flex={3} bg="white" p={5} borderRadius="lg" boxShadow="lg">
              {blog && (
                <VStack spacing={8} align="start">
                  <Heading fontSize="4xl" color="blue.600">
                    {blog.title}
                  </Heading>
  
                  {blog.videos && <VideoPlayer videos={blog.videos} />}
  
                  {mergeContentAndImages(blog.content, blog.images).map(
                    (block, index) =>
                      block.type === "paragraph" ? (
                        <Text key={index} fontSize="lg" color="gray.800">
                          {block.value}
                        </Text>
                      ) : (
                        <Image
                          key={index}
                          src={block.value}
                          alt={`Blog Image ${index + 1}`}
                          w="100%"
                          h="auto"
                          borderRadius="lg"
                          boxShadow="md"
                        />
                      )
                  )}
  
                  {blog.codeSnippets.length > 0 && (
                    <Box w={{ base: "90%", lg: "500px" }}>
                      <Heading fontSize="2xl" color="teal.500" mb={4}>
                        Code Snippets
                      </Heading>
                      {blog.codeSnippets.map((snippet, index) => (
                        <Box
                          key={index}
                          mb={8}
                          p={4}
                          border="1px solid #e2e8f0"
                          borderRadius="md"
                        >
                          <Text>{snippet.title}</Text>
                          <SyntaxHighlighter
                            language={snippet.language}
                            style={materialOceanic}
                          >
                            {snippet.code}
                          </SyntaxHighlighter>
                          <Text>{snippet.explanation}</Text>
                        </Box>
                      ))}
                    </Box>
                  )}
                </VStack>
              )}
  
   
  <Divider my={6} />
              <Flex align="center" justify="space-between" mb={4}>
                <Heading fontSize="2xl" color="blue.600">
                  Comments
                </Heading>
                <Flex align="center">
                  <Text fontSize="md" color="gray.600" mr={2} onClick={onOpen}>
                    {comments.length} Comments
                  </Text>
                  <IconButton
                    icon={<FaComments />}
                    colorScheme="blue"
                    onClick={onOpen}
                    aria-label="View Comments"
                    m={1}
                  />
                                <Tooltip label="Like">
                                  <IconButton
                                    icon={<FaThumbsUp />}
                                    colorScheme="blue"
                                    // onClick={handleLike}
                                    aria-label="Like"
                                  />
                                </Tooltip>
                                <Tooltip label="Share">
                                  <Flex gap={2}>
  
  
                                    <FacebookShareButton url={window.location.href}>
                                    <IconButton icon={<FaFacebook color="blue.400" size={40}/>} aria-label="facebook"/>
                                    </FacebookShareButton>
  
                                    <TwitterShareButton url={window.location.href}>
                                    <IconButton icon={<BsTwitterX   size={40}/>} aria-label="twiter"/>
                                    </TwitterShareButton>
  
  
                                    <WhatsappShareButton url={window.location.href}>
                                    <IconButton icon={<FaWhatsapp color="green" size={40}/>} aria-label="whatsapp" />
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
                              {/* <Flex gap={2}>
                                {reactions.map((reaction) => (
                                  <Text key={reaction.emoji}>
                                    {reaction.emoji} {reaction.count}
                                  </Text>
                                ))}
                              </Flex> */}
                </Flex>
              </Flex>
              <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Comments</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <VStack spacing={4} align="start">
                      {comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <>
                          <Stack direction="row" h="20">
                        <Avatar
                        name={comment.user}
                        src={comment.profile_picture || undefined}
                        size="md"
                        mr={4}
                      />
                          <Box
                            key={index}
                            bg="gray.100"
                            p={3}
                            borderRadius="md"
                            w="100%"
                            >
                              <Heading size="sm">{comment.user}</Heading>
                            <Text color="gray.700">{comment.content}</Text>
  
                            <Stack>
                              
                            </Stack>
                            <Text fontSize="sm" color="gray.500">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </Text>
  
                          </Box>                 
                            </Stack>
                            
            
                            </>
                        ))
                      ) : (
                        <Text color="gray.600">
                          No comments yet. Be the first to comment!
                        </Text>
                      )}
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
  
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex mt={4} gap={2} align="center">
                  <Input
                    placeholder="Write a comment..."
                    {...register("content", { required: true })}
                  />
                  <Button colorScheme="blue" type="submit">
                    Add
                  </Button>
                </Flex>
              </form>
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
                    <Box
                      key={story.id}
                      p={4}
                      bg="gray.50"
                      borderRadius="lg"
                      boxShadow="md"
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                    >
                      <RouterLink to={`/blog/${story.id}/${story.slug}`}>
                        <Image
                          src={story.image}
                          alt={story.title}
                          w="100%"
                          h="150px"
                          objectFit="cover"
                          borderRadius="md"
                          mb={2}
                        />
                        <Heading fontSize="md" color="blue.500">
                          {story.title}
                        </Heading>
                        <Text color="gray.600" mt={2}>
                          {/* {story.description} */}
                        </Text>
                      </RouterLink>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          </Flex>
        </Container>
        <Footer />
      </Box>
  
            )}
  export default BlogDetail