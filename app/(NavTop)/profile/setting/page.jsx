"use client";

import { HOST } from '@/setting';
import { useContext, useEffect, useState } from 'react';
import { auth_context } from '@/contexts/auth';
import { error_swal, success_swal } from '@/components/notification';
import { useRouter } from 'next/navigation';
import { EditIcon } from '@chakra-ui/icons';
import { ScaleFade } from '@chakra-ui/react';
import Loading from '../loading';

const Input = ({val, title, callback})=>{
    return(
        <div className='flex py-5'>
            <p className='w-32 text-base text-slate-400 '>{title}</p>
            <textarea 
                className='w-full p-2 border-2 rounded-lg' 
                value={val}
                onChange={(e)=>{ callback(e.target.value) }}
            />
        </div>
    );
}

const ProfileForm = ({infos, callback}) => {
    const auth = useContext(auth_context);
    const user = auth.getUser();
    const router = useRouter();

    const [vals, setVal] = useState({});

     const cols = [
        {key: "school", title: "學校", type: "text"},
        {key: "bio", title: "自我介紹", type: ""}
    ]

    useEffect(()=>{setVal({...infos})},[infos]);

    const handleChange = (key, val)=>{
        let new_vals = {...infos};
        new_vals[key] = val;

        setVal(new_vals);

        let change = cols.reduce((a, v)=>{
            if(infos[v.key] !== new_vals[v.key]) return a+1;
            else return a;
        }, 0);
        setChange(change > 0);
    }

    const restoreBackup = ()=>{
        setVal({...infos});
        setChange(false);
    }

    const handleProfileUpdate = async ({bio, school}) => {
        let res = await fetch(`${HOST}/api/profile/${user.handle}`,{
            method: "POST",
            body: JSON.stringify({
                "bio": bio,
                "school": school
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        // if success
        success_swal("更新成功").then(()=>{
            callback({...vals});
            setChange(false);
        })


    }

    return(
        <div className='grow py-2 h-max'>
            {
                cols.map((col)=>(
                    <Input 
                        key={col.title}
                        val={vals[col.key]} 
                        title={col.title}
                        callback={(val)=>handleChange(col.key, val)}
                    />
                ))
            }
            <div className='mx-auto w-fit'>
                <button 
                    className='bg-orange-500 text-white p-2 rounded-lg mx-3'
                    onClick={()=>handleProfileUpdate(vals)}
                >確認更改</button>
                <button
                    className='bg-gray-400 text-white p-2 rounded-lg mx-3' 
                    onClick={()=>{router.push(`/profile/${user.handle}`)}}
                >取消</button>
            </div>
        </div>
    )
}

const ImgForm = ({imgSrc, callback, display}) => {
    const auth = useContext(auth_context);
    const handle = auth.getUser().handle;

    const [newImg, setNew] = useState(null);

    useEffect(()=>{
        setNew(imgSrc);
    },[imgSrc])

    const handleUpdate = async () =>{
        const imageBuffer = await fetch(newImg).then((res) =>res.arrayBuffer());
        const mime = newImg.match(/:(.*?);/)[1];
        
        let res = await fetch(`${HOST}/api/profile/${handle}/avatar`, {
            method: "PUT",
            headers: {
                "content-type": mime,
                "content-length": imageBuffer.byteLength,
            },
            body: imageBuffer
        })
        if(res.ok){
            success_swal("大頭照更改成功").then(()=>callback(false));
        }
        else{
            error_swal("大頭照上傳失敗");
        }
    }

    const updateImg = () =>{
        let file_input = document.createElement("input")
        file_input.type = "file"
        file_input.accept = "image/*"
        file_input.onchange = e => {
            let image = e.target.files[0];
            let reader = new FileReader();
            reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                setNew(content);
            }
            reader.readAsDataURL(image)
        }
        file_input.click();
    }

    return(
        <div className={` fixed bg-black/[.3] inset-0 justify-center z-10 overflow-y-auto py-5 ${display?"flex":'hidden'}`}>
            <div className='max-w-xl w-1/2 my-auto shadow-2xl rounded-lg bg-white border-2 p-5 '>
                <div className='w-full'>
                    <button className='ml-auto w-5 h-5 block' onClick={()=>callback(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
                <div className='border-b-2 pb-2 mb-2'>
                    <p className='text-2xl font-medium text-center'>請上傳新圖片</p>
                </div>
                <div className='my-10'>
                    <img className={'w-52 h-52 object-cover mx-auto rounded-full border-2'} src={newImg}/>
                </div>
                <div className='w-fit mx-auto'>
                    <button className='bg-orange-500 text-white p-2 rounded-lg mx-3' onClick={handleUpdate}>確認更改</button>
                    <button className='bg-gray-400 text-white p-2 rounded-lg mx-3' onClick={updateImg}>上傳圖片</button>
                </div>
            </div>
        </div>    
    )
}

const SetProfile = () =>{
    const auth = useContext(auth_context);
    const handle = auth.getUser().handle;
    const [imgpop, setPop] = useState(false);
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
    }

    return(
        <>  
            <ScaleFade in={profile} unmountOnExit={true}>
                <div className="flex p-5 shadow-2xl rounded-lg bg-white border-2">
                    <div className='w-full'>
                        <p className='pl-2 text-2xl font-medium mb-2'>設定個人資料</p>
                        <div className='flex'>
                            <div className='w-64'>
                                <div className='w-52 h-52 mx-auto relative'>
                                    <img className='w-52 h-52 object-cover rounded-full border-2' src={profile?.img}/>
                                    <button className='absolute bottom-3 right-3 bg-black w-10 h-10 rounded-full text-white' onClick={()=>setPop(true)}>
                                        <EditIcon mx={'auto'}/>
                                    </button>
                                </div>
                                <div className='my-5'>
                                    <p className="text-base text-slate-400 ">{(profile?.role === 1)? "管理員" : "使用者"}</p>
                                    <p className="w-full text-center text-5xl font-medium text-black-700">{ handle }</p>
                                </div>
                            </div>
                            <ProfileForm infos={profile} callback={setProfile}/>
                        </div>
                        <ImgForm callback={setPop} imgSrc={profile?.img} display={imgpop}/>
                    </div>
                </div>
            </ScaleFade>
            {(profile)?"":(<Loading/>)}
        </>
    )
}

export default SetProfile;