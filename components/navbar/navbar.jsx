import { 
    Box,
    Container,
    Stack,
    Flex,
    Image,
    Link
} from '@/components/chakra';
import { pages } from './options';
import { User } from '@/components/navbar/user';
import { NavLink } from '@/components/navbar/link';
import NextLink from 'next/link';
import logo from '@/public/logo-white.svg';


export const Navbar = ()=>{
    return(
        <Box
            as='nav'
            w={'100%'}
        >
            <Container
                display={'flex'}
                height={16}
                maxW={'container.xl'}
            >  
                <Flex align={'center'}>
                    <Link as={NextLink} href='/'>
                        <Image alt='logo' height={12} src={logo.src}/>
                    </Link>
                </Flex>
                <Flex 
                    // display={{base: 'none', lg: 'flex'}}
                    direction={'row'} 
                    align={'center'} 
                    flex={1} 
                    marginLeft={12}
                >
                    <Stack
                        display={{base: 'none', lg : 'flex'}}
                        direction={'row'}
                        align={'center'}
                        gap={10}
                    >   
                        {pages.map(({title, href})=>(
                            <NavLink key={href} href={href}>{title}</NavLink>
                        ))}
                    </Stack>
                    <Box flex={1}>
                        <User/>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}


