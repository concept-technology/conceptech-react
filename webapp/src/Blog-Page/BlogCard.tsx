import { Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { newsProps } from './api-client'





interface props {
  cardContents: newsProps

}

const BlogCard = ({ cardContents }: props) => {
  return (
    <>
      <SimpleGrid p={5} columns={{ base: 1, lg: 1 }} spacing={10}>
        <Stack>
          {/* {cardContents.map(items => */}
          <Card key={cardContents.newsHeading}
            overflow='hidden'
            variant='outline'
            direction={{ lg: 'row', base: 'column' }}>
            <CardHeader>
              <HStack>
                <Text>{cardContents.time}</Text>
                <Text>{cardContents.newsDate}</Text>
              </HStack>
              <Image maxW={{ base: "90%", lg: '60%' }}
                borderRadius={20}
                src={cardContents.newsImage} />
            </CardHeader>
            <CardBody>
              <Heading fontSize={{ base: 30, lg: 50 }}>{cardContents.newsHeading}</Heading>
              <Heading fontSize={{ base: 20, lg: 25 }}>   {cardContents.newsSubHeading}</Heading>
            </CardBody>
            <CardFooter
              justify='space-between'
              flexWrap='wrap'
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>

          </Card>
          {/* )} */}
        </Stack>
      </SimpleGrid>

    </>


  )
}
export default BlogCard