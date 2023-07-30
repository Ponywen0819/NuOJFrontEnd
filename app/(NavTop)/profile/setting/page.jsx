"use client";

import { HOST } from '@/setting';
import { useContext, useEffect, useState, createContext } from 'react';
import { auth_context } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { ScaleFade } from '@chakra-ui/react';
import { Loading } from '@/components/loading';
import { ImgForm } from './component/imgForm';
import { ProfileForm } from './component/profileForm';

// const Input = ({val, title, callback})=>{
//     return(
//         <div className='flex py-2'>
//             <p className='w-24 text-base text-slate-400 '>{title}</p>
//             <textarea 
//                 className='grow p-2 border-2 rounded-lg min-h-[64px]' 
//                 value={val}
//                 onChange={(e)=>{ callback(e.target.value) }}
//             />
//         </div>
//     );
// }

// const ProfileForm = ({infos, callback}) => {
//     const auth = useContext(auth_context);
//     const user = auth.getUser();
//     const router = useRouter();

//     const [vals, setVal] = useState({});

//      const cols = [
//         {key: "school", title: "學校", type: "text"},
//         {key: "bio", title: "自我介紹", type: ""}
//     ]

//     useEffect(()=>{setVal({...infos})},[infos]);

//     const handleChange = (key, val)=>{
//         let new_vals = {...infos};
//         new_vals[key] = val;

//         setVal(new_vals);

//         let change = cols.reduce((a, v)=>{
//             if(infos[v.key] !== new_vals[v.key]) return a+1;
//             else return a;
//         }, 0);
//         setChange(change > 0);
//     }

//     const restoreBackup = ()=>{
//         setVal({...infos});
//         setChange(false);
//     }

//     const handleProfileUpdate = async ({bio, school}) => {
//         let res = await fetch(`${HOST}/api/profile/${user.handle}`,{
//             method: "POST",
//             body: JSON.stringify({
//                 "bio": bio,
//                 "school": school
//             }),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })

//         if success
//         success_swal("更新成功").then(()=>{
//             callback({...vals});
//             setChange(false);
//         })


//     }

//     return(
//         <div className='grow py-2 flex flex-col justify-between'>
//             <div>
//             {
//                 cols.map((col)=>(
//                     <Input 
//                         key={col.title}
//                         val={vals[col.key]} 
//                         title={col.title}
//                         callback={(val)=>handleChange(col.key, val)}
//                     />
//                 ))
//             }
//             </div>
//             <div className='mx-auto w-fit'>
//                 <button 
//                     className='bg-orange-500 text-white p-2 rounded-lg mx-3'
//                     onClick={()=>handleProfileUpdate(vals)}
//                 >確認更改</button>
//                 <button
//                     className='bg-gray-400 text-white p-2 rounded-lg mx-3' 
//                     onClick={()=>{router.push(`/profile/${user.handle}`)}}
//                 >取消</button>
//             </div>
//         </div>
//     )
// }

export const profile_context = createContext(null);

const SetProfile = () =>{
    const auth = useContext(auth_context);
    const handle = auth.getUser().handle;
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