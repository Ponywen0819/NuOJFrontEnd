import logo_min from '@/public/logo_min.png';
import {
    Box,
    Flex,
    Center,
    Text,
    Image,
    Container
} from '@/components/chakra';


export default function TableLayout({ children }) {
    return (
            <>
                <Flex 
                    gap={3}
                >
                    <Box 
                        as='section' 
                        flex={1}
                        overflowX={'auto'}
                    >
                        {children}
                    </Box>
                    <Container 
                        as='aside'
                        display={{base: 'none', lg: 'block'}}
                        w={'fit-content'}
                        p={0}
                    >
                        <Center 
                            w={64} 
                            h={64} 
                            backgroundColor={"whiteAlpha.900"}
                            borderRadius={'lg'}
                            boxShadow={'sm'}
                        >
                            <Box>
                                <Image 
                                    alt='aside logo' 
                                    width={"128px"} 
                                    height={"128px"} 
                                    src={logo_min.src}
                                />
                                <Text align={'center'}>NuOJ lab.</Text>
                            </Box>
                        </Center>
                    </Container>
                </Flex>
            </>
            
    );
  }