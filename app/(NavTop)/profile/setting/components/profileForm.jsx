import { error_swal, success_swal } from '@/components/notification';
import { useContext, useRef, useEffect } from 'react';
import { profile_context } from '../page';
import { useRouter } from 'next/navigation';
import { HOST } from '@/setting';

export const ProfileForm = ({ cols }) => {
    const router = useRouter();
    const { profile, uploadProfile } = useContext(profile_context);
    const { handle } = profile;
    const records = (cols)? cols.map((col)=>({ ...col, ref: useRef(null)})) : [];

    useEffect(()=>{
        records.map((col)=>{
            const {ref, key} = col;
            ref.current.value = profile[key];
        });
    },[])

    const handleProfileUpdate = async () => {
        const vals = records.reduce((acc, curr)=>{
            const { key, ref } = curr
            acc[key] = ref.current.value;
            return acc;
        },{})

        let res = await fetch(`${HOST}/api/profile/${handle}`,{
            method: "POST",
            body: JSON.stringify(vals),
            headers: { "Content-Type": "application/json" }
        })
        if(res.ok){
            success_swal("更新成功").then(()=>{
                uploadProfile(vals)
                router.push(`/profile/${handle}`)
            })
        }
        else error_swal("上傳發生問題")
    }

    return(
        <div className='grow py-2 flex flex-col justify-between'>
            <div>
            {
                records.map(({ title, ref })=>{
                    return(
                        <div className='flex py-2' key={`${title}-input`}>
                            <p className='w-24 text-base text-slate-400 '>{title}</p>
                            <textarea 
                                ref={ref}
                                className='grow p-2 border-2 rounded-lg min-h-[64px]' 
                            />
                        </div>
                    )
                })
            }
            </div>
            <div className='mx-auto w-fit'>
                <button 
                    className='bg-orange-500 text-white p-2 rounded-lg mx-3'
                    onClick={handleProfileUpdate}
                >確認更改</button>
                <button
                    className='bg-gray-400 text-white p-2 rounded-lg mx-3' 
                    onClick={()=>{router.push(`/profile/${handle}`)}}
                >取消</button>
            </div>
        </div>
    )
}
