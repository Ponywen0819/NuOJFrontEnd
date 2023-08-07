"use client";

import { HOST } from '@/setting';
import { useContext, useEffect, useState, createContext } from 'react';
import { auth_context } from '@/contexts/auth';
import { 
    ScaleFade,
    Flex,
    Box,
    Image,
    Stack,
    Text,
    IconButton,
    EditIcon
} from '@/components/chakra';
import { Loading } from '@/components/loading';
import { ImgForm } from './components/imgForm';
import { ProfileForm } from './components/profileForm';

export const profile_context = createContext(null);

const SetProfile = () =>{
    const { user } = useContext(auth_context);
    const { handle } = user;
    const [imgFormPop, setPop] = useState(false);
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

    const { img, role } = profile || {}

    return(
        <>  
            <ScaleFade in={profile} unmountOnExit={true}>
                <Flex direction={{base: "column", lg: 'row'}} gap={3}>
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
                            <Box position={'relative'} boxSize={{base: "3xs", lg: 'xs'}}>
                                <Image 
                                    alt="user avater"
                                    boxSize={{base: "3xs", lg: 'xs'}}
                                    fit={'cover'}
                                    borderRadius={'full'}
                                    src={img}
                                />
                                <IconButton 
                                    icon={<EditIcon/>}
                                    position={'absolute'}
                                    bottom={{base: 3, lg: 6}}
                                    right={{base: 3, lg: 6}}
                                    backgroundColor={'blackAlpha.900'}
                                    color={'whiteAlpha.900'}
                                    isRound={true}
                                    onClick={()=>setPop(true)}
                                />
                            </Box>
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
                            </Flex>
                        </Flex>
                    </Stack>
                    <ProfileForm initial={profile} handle={handle}/>
                </Flex>
            </ScaleFade>
            {imgFormPop? 
                <ImgForm 
                    initial={img} 
                    handle={handle} 
                    close={()=>setPop(false)} 
                    updateImg ={(newImg)=>{
                        setProfile((old)=>{
                            old.img = newImg;
                            return old;
                        })
                    }}
                /> : ''}
            {(profile)?"":(<Loading/>)}
        </>
    )
}

export default SetProfile;