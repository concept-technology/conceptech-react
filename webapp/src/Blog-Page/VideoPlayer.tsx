import { useState } from "react";
import ReactPlayer from "react-player";
import { Box, Button, Heading } from "@chakra-ui/react";

export interface VideoProps {
  id: number;
  title: string;
  url: string;
  video: string;
  description:string
}


interface VideoPlayerProps {
  videos: VideoProps[];
}

const VideoPlayer = ({ videos }: VideoPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!videos || videos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = videos[currentIndex];

  return (
    <Box width={{ base: "90%", lg: "100%" }} mx="auto">
      <Heading fontSize="2xl" color="purple.500" mb={4}>
        Videos
      </Heading>
      <Box mb={8}>
        <Heading fontSize="lg" color="gray.700" mb={2}>
          {currentVideo.title}
        </Heading>
        <ReactPlayer
          url={currentVideo.url ? currentVideo.url: currentVideo.video}
          controls
          width="100%"
          height="400px" // Explicit height for ReactPlayer
        />
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button onClick={handlePrevious} colorScheme="purple">
            Previous
          </Button>
          <Button onClick={handleNext} colorScheme="purple">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
