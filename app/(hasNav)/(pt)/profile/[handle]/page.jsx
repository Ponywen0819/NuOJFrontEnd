"use client";

import { HOST } from "@/setting";
import Loading from './loading';
import NotFound from './not-found';
import { useEffect, useState } from "react";
// import { useState, useEffect } from 'react';

const Info = ({ info }) => {
    const subtitles = [
        { key: "school", title: "學校" },
        { key: "email", title: "電子信箱" },
        { key: "bio", title: "個人介紹" }
    ];

    return(
        <>
            <div className="mr-2 border-r-0 pr-2">
                <img className={`w-52 h-52 object-cover rounded-full border-2`} src={info.img}/>
            </div>
            <div className="grow">
                <div className="mb-2 border-b-2 pb-2">
                    <p className="text-base text-slate-400 ">{(info.role === 1)? "管理員" : "使用者"}</p>
                    <p className="text-5xl font-medium text-black-700">{info.handle}</p>
                </div>
                {
                    subtitles.map((subtitle)=>(
                        <div key={subtitle.key} className="pb-2">
                            <p className="text-sm text-slate-400 ">{subtitle.title}</p>
                            <p className="text-base text-slate-900 break-words">{info[subtitle.key]}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}


const Profile = ({params})=>{
    const handle = params.handle;

    const [loaded, setLoaded] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(()=>{
        getInfo();
    },[]);

    const getInfo = async () =>{
        const info_res = await fetch(`${HOST}/api/profile/${handle}`);
        if(info_res.ok) {
            const profile = await info_res.json();
            setProfile(profile);

            const img_res = await fetch(`${HOST}/api/profile/${handle}/avatar`);
            if(img_res.ok){
                const buffer = await img_res.blob(); 
                const reader = new FileReader();
                reader.onload = () =>{
                    const base64 = reader.result;
                    setProfile((old)=>({...old, img: base64, handle: handle}));
                }
                reader.readAsDataURL(buffer);
            }
        }
        else{
            setProfile(null)
        }
        setLoaded(true);
    }
    if( loaded && profile){
        return (<Info info={profile}></Info>)
    }
    else if(loaded && !profile){
        return (<NotFound></NotFound>)
    }
    else{
        return (<Loading></Loading>)
    }
}

export default Profile;