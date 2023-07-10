"use client";

import { HOST } from "@/setting";
import { useState, useEffect } from 'react';

const Profile = ({ params }) => {
    const handle = params.handle;
    const [info, setInfo] = useState({school:'', email: "",role: 0, bio: "" });
    const [imgsrc, setSrc] = useState(null);

    useEffect(()=>{
        getUserInfo();
        getImgSrc();
    },[])

    const getUserInfo = async () => {
        let res = await fetch(`${HOST}/api/profile/${handle}`, {
          method: "GET",
        });
        if (res.ok) {
          let json = await res.json();
          setInfo(json);
        }
      };
      
    const getImgSrc = async () => {
        let res = await fetch(`${HOST}/api/profile/${handle}/avatar`, {
            method: "GET",
        });
        if (res.ok) {
            let blob = await res.blob();
            let reader = new FileReader();
            reader.onloadend = function () {
                let base64data = reader.result;
                setSrc(base64data);
            };
            reader.readAsDataURL(blob);
        }
    };
      

    const subtitles = [
        { key: "school", title: "學校" },
        { key: "email", title: "電子信箱" },
        { key: "bio", title: "個人介紹" }
    ];

    return(
        <div className="mx-auto max-w-5xl flex p-5 shadow-2xl rounded-lg bg-white border-2">
            <div className="mr-2 border-r-0 pr-2">
                <img className={`w-52 h-52 object-cover rounded-full border-2`} src={imgsrc}/>
            </div>
            <div className="grow">
                <div className="mb-2 border-b-2 pb-2">
                    <p className="text-base text-slate-400 ">{(info.role === 1)? "管理員" : "使用者"}</p>
                    <p className="text-5xl font-medium text-black-700">{handle}</p>
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
        </div>
    )
}

export default Profile;