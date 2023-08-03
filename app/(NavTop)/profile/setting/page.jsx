"use client";

import { HOST } from '@/setting';
import { useContext, useEffect, useState, createContext } from 'react';
import { auth_context } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { ScaleFade } from '@chakra-ui/react';
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
        let temp = {}

        const info_res = await fetch(`${HOST}/api/profile/${handle}`);
        if(info_res.ok) {
            const profile = await info_res.json();
            temp = profile;

            const img_res = await fetch(`${HOST}/api/profile/${handle}/avatar`);
            if(img_res.ok){
                const buffer = await img_res.blob(); 
                const reader = new FileReader();
                reader.onload = () =>{
                    const base64 = reader.result;
                    setProfile((old)=>({...temp, img: base64, handle: handle}));
                }
                reader.readAsDataURL(buffer);
            }
        }
        else{
            setProfile(null)
        }
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
                    <div className="p-5 shadow-2xl rounded-lg bg-white border-2">
                        <p className='pl-2 text-2xl font-medium mb-2'>設定個人資料</p>
                        <div className='flex'>
                            <ImgForm/>
                            <ProfileForm cols={[
                                { key: "school", title: "學校" },
                                { key: "bio", title: "自我介紹" }
                            ]}/>
                        </div>
                    </div>
                </ScaleFade>
            </profile_context.Provider>
            {(profile)?"":(<Loading/>)}
        </>
    )
}

export default SetProfile;