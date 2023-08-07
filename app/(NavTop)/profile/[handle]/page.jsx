"use client";

import { HOST } from "@/setting";
import { Loading } from '@/components/loading';
import NotFound from './not-found';
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

const Info = ({ info, handle }) => {
    const auth_handle = useContext(auth_context).user?.handle;
    const { img, role, email, school, bio } = info;

    return(
        <Flex
            direction={{base: "column", lg: 'row'}}
            gap={3}
        >
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
                        >{role?"管理員" : "使用者"}</Text>
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
    )
}

const Profile = ({ params })=>{
    const handle = params.handle;
    const [profile, setProfile] = useState(null);

    useEffect(()=>{
        getInfo();
    },[]);

    const getInfo = async () =>{
        const info_res = await fetch(`${HOST}/api/profile/${handle}`);
        if(!info_res.ok){
            setProfile({notFound: true});
            return;
        }
        const profile = await info_res.json();

        const img_res = await fetch(`${HOST}/api/profile/${handle}/avatar`);
        if(!img_res.ok){
            setProfile({notFound: true});
            return;
        }
        const blob = await img_res.blob();
        const reader = new FileReader();
        reader.onload = () =>{
            const base64 = reader.result;
            setProfile({
                img: base64, 
                handle: handle,
                ...profile
            });
        }
        reader.readAsDataURL(blob);
    }

    return(
        <>
            <SlideFade in={profile} unmountOnExit={true}>
                {
                    (profile && profile.notFound)?(
                    <NotFound/>):(
                    <Info info={profile} handle={handle}/>
                )}
            </SlideFade>
            {( !profile ) && (<Loading/>)}
        </>
        
    )
}

export default Profile;