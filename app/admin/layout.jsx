'use client'

import { Navbar } from '@/components/navbar';
import { auth_context } from '@/contexts/auth';
import {
    Box,
    Container,
} from '@/components/chakra';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import Loading from './loading';

const AdminLayout = ({ children })=>{
    const { user } = useContext(auth_context);

    return(
        <>
            <Box as='header' backgroundColor={'blackAlpha.900'}>
                <Navbar/>
            </Box>
            <Container as='main' paddingX={3} paddingY={5} maxW={'container.xl'}>
                {
                    (user) ?(
                        (user.role)?(
                            children
                        ):(
                            redirect("/")
                        )
                    ):(
                        <Loading/>
                    )
                }
            </Container>
        </>
    )
}

export default AdminLayout;