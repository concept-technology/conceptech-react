import { Button, HStack, List, ListItem, VStack , Image, Show, MenuItem, Menu} from "@chakra-ui/react"
import useBlog from "./hooks/useBlog"

const Categories = ()=>{

    const {data} = useBlog('api/blog/categories/')
    return(
        <VStack>
            <List>
            {data.map(cate=>
            <>
                <HStack>

                    <ListItem m={5}><Button variant='link'>
                        <Image src={cate.image} w='60px' borderRadius={5} m={1} />
                        {cate.name}</Button>
                    </ListItem>
                </HStack>

      
            </>
            )}
            </List>
        </VStack>
    )
}
export default Categories