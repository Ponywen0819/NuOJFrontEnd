"use client";

import { HOST } from "@/setting";
import { Loading } from '@/components/loading';
import NotFound from './error';
import { useEffect, useState, useContext } from "react";
import { auth_context } from '@/contexts/auth';
import{
    SlideFade,
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    Divider,
    Stack
} from '@/components/chakra'
import NextLink from 'next/link';
import useSWR from 'swr';

const fetcher = (...arg) => fetch(...arg).then((res)=>{
    if(!res.ok){
        const error = new Error("error on fetching user information")
        error.message = "User Not Found"
        throw error;
    }

    return res.json();
})

const imgFetcher = (...arg) => fetch(...arg).then((res)=>{
    if(!res.ok){
        const error = new Error("error on fetching user information")
        error.message = "User Image Not Found"
        throw error;
    }
    return res.blob();
}).then((blob)=> new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>{
        const base64 = reader.result;
        resolve(base64);
    }
    reader.readAsDataURL(blob);
}))

const Profile = ({ params })=>{
    const handle = params.handle;
    const { data: profile } = useSWR(`${HOST}/api/profile/${handle}`, fetcher, { suspense: true });
    const { data: img } = useSWR(`${HOST}/api/profile/${handle}/avatar`, imgFetcher, {suspense: true});
    const auth_handle = useContext(auth_context).user?.handle;
    const { role, email, school, bio } = profile;

    return(
        <SlideFade in={profile} unmountOnExit={true}>
            <Flex direction={{ base: 'column', lg: 'row'}} gap={3}>
                <Stack
                    backgroundColor={'whiteAlpha.900'}
                    borderRadius={'lg'}
                    boxShadow={'sm'}
                    paddingX={3}
                    paddingY={5}
                >
                    <Flex
                        direction={{base: 'row',lg: 'column'}}
                        gap={3}
                    >
                        <Image 
                            alt="user avater"
                            boxSize={{base: "3xs", lg: 'xs'}}
                            borderRadius={'full'}
                            src={img}
                        />
                        <Flex 
                            flex={1} 
                            direction={'column'} 
                            justify={'space-between'}
                        >
                            <Text
                                w={'100%'}
                                fontSize={'xl'}
                                fontWeight={'bold'}
                                color={'gray.400'}
                                align={'left'}
                            >{ role?"管理員" : "使用者" }</Text>
                            <Text
                                fontWeight={'bold'}
                                fontSize={'5xl'}
                                align={{base: 'center', lg: 'left'}}
                            >{handle}</Text>
                            {
                                (auth_handle === handle)?(
                                    <Link
                                        as={NextLink} 
                                        href="/profile/setting"
                                        display={'block'}
                                        width={'100%'}
                                        borderWidth={"1px"}
                                        borderRadius={'lg'}
                                        borderColor={'gray.300'}
                                        color={'gray.300'}
                                        textAlign={'center'}
                                        fontSize={'xl'}
                                    >修改個人資料</Link>
                                ):('')
                            }
                        </Flex>
                    </Flex>
                </Stack>
                <Stack 
                    flex={1}
                    height={'fit-content'}
                    backgroundColor={'whiteAlpha.900'}
                    borderRadius={'lg'}
                    boxShadow={'sm'}
                    paddingX={3}
                    paddingY={5}
                    gap={3}
                >
                    <Heading as={'h1'}>個人資訊</Heading>
                    <Divider marginY={3}/>
                    <Box>
                        <Heading 
                            as={'h2'}
                            fontSize={'xl'} 
                            color={'gray.400'}
                        >學校</Heading>
                        <Text fontSize={'2xl'} mt={2}>{school}</Text>    
                    </Box>
                    <Box>
                        <Heading 
                            as={'h2'}
                            fontSize={'xl'} 
                            color={'gray.400'}
                        >電子郵件</Heading>
                        <Text fontSize={'2xl'} mt={2}>{email}</Text>    
                    </Box>
                    <Box>
                        <Heading 
                            as={'h2'} 
                            fontSize={'xl'}
                            color={'gray.400'}
                        >自我介紹</Heading>
                        <Text fontSize={'2xl'} mt={2}>{bio}</Text>    
                    </Box>
                </Stack>
            </Flex>
        </SlideFade>
    )
}

export default Profile;