import { Navbar } from '@/components/navbar';
import {
    Box,
    Flex,
    Heading,
    Text,
    Link,
    Image
} from '@/components/chakra';
import IndexImg from '@/public/index.jpg';
import ntut_logo from '@/public/ntut_logo.png';


const Index = ()=>{
    return (
        <>
            <Box
                as='header'
                position={'absolute'}
                top={0}
                w={'100%'}
                zIndex={50}
            >
                <Navbar/>
            </Box>
            <Flex
                as='main'
                minH={'800px'}
                height={'100vh'}
                w={'100%'}
                bgPosition={'center'}
                backgroundSize={'cover'}
                backgroundImage={`url(${IndexImg.src})`}
            >
                <Flex
                    flex={1}
                    direction={'column'}
                    backgroundColor={'rgba(0,0,0,0.6)'}
                    justify={'end'}
                    align={'center'}
                    color={'whiteAlpha.900'}
                >
                    <Box>
                        <Heading as={'h1'} textAlign={'center'}> 
                            Welcome to
                            <Box as='span' color={'orange.500'}> NuOJ!</Box>
                        </Heading>
                        <Text textAlign={'center'} fontWeight={'bold'}>一款來自 國立臺北科技大學 的線上程式評測系統</Text>
                        <Text textAlign={'center'} fontWeight={'bold'}>
                            系統正在進行開發中，你可以追蹤
                            <Link href='https://github.com/ntut-xuan/NuOJ' color={'orange.500'}>
                                我們的開發進度
                            </Link>
                        </Text>
                    </Box>
                    <Flex
                        h={'50%'}
                        direction={'column'}
                        justify={'center'}
                    >
                        <Link
                            href="https://ntut.edu.tw"
                            backgroundColor={'whiteAlpha.900'}
                        >
                            <Image
                                alt='NTUT' 
                                src={ntut_logo.src} 
                                height={12}
                            />
                        </Link>
                        <Box as='footer' padding={4}>
                            <Text color={'whiteAlpha.900'} textAlign={'center'} fontWeight={'bold'}>
                                <Box as='span' color={'orange.500'}>
                                    2023
                                </Box>
                                , NuOJ Team.
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
};


export default Index;