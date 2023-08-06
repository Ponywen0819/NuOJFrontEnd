"use client";

import { HOST } from '@/setting';
import { useContext, useEffect, useState, createContext } from 'react';
import { auth_context } from '@/contexts/auth';
import { 
    ScaleFade,
    Flex
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

    const uploadProfile = (newprofile) =>{
        setProfile((old)=>{
            Object.keys(newprofile).reduce((_, curr) =>{
                old[curr] = newprofile[curr]
            }, 0);
            return old;
        })
    }

    const context = {
        imgFormPop,
        profile,
        setPop,
        uploadProfile
    };

    return(
        <>  
            <profile_context.Provider value={context}>
                <ScaleFade in={profile} unmountOnExit={true}>
                    <Flex>
                        <ImgForm/>
                        <ProfileForm initial={profile} handle={handle}/>
                    </Flex>
                </ScaleFade>
            </profile_context.Provider>
            {(profile)?"":(<Loading/>)}
        </>
    )
}

export default SetProfile;