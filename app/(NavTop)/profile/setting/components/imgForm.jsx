import { SlideFade, IconButton } from '@chakra-ui/react';
import { SmallCloseIcon, EditIcon } from '@chakra-ui/icons';
import { error_swal, success_swal } from '@/components/notification';
import { useContext, useState } from 'react';
import { profile_context } from '../page';
import { HOST } from '@/setting';

const InputForm = () =>{
    const { imgFormPop, setPop, profile, uploadProfile} = useContext(profile_context);
    const { handle, img } = profile || {};
    const [imgBuff, setBuff] = useState(null);

    const Close = ()=>{
        setPop(false);
        setBuff(null);
    }

    const handleUpdate = async () =>{
        if(!imgBuff){
            success_swal("大頭照並未更改").then(Close);
            return
        }

        const imageBuffer = await fetch(imgBuff).then((res) =>res.arrayBuffer());
        const mime = imgBuff?.match(/:(.*?);/)[1];
        
        let res = await fetch(`${HOST}/api/profile/${handle}/avatar`, {
            method: "PUT",
            headers: {
                "content-type": mime,
                "content-length": imageBuffer.byteLength,
            },
            body: imageBuffer
        })
        if(res.ok){
            uploadProfile({img: imgBuff})
            success_swal("大頭照更改成功").then(Close);
        }
        else{
            error_swal("大頭照上傳失敗");
        }
    }

    const updateImg = () =>{
        const file_input = document.createElement("input")
        file_input.type = "file"
        file_input.accept = "image/*"
        file_input.onchange = e => {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = readerEvent => {
                setBuff(readerEvent.target.result);
            }
            reader.readAsDataURL(image)
        }
        file_input.click();
    }

    return(
        <SlideFade in={imgFormPop} unmountOnExit={true}>
            <div className={`fixed bg-black/[.3] inset-0 flex justify-center z-10 overflow-y-auto py-5`}>
                <div className='max-w-xl w-1/2 my-auto shadow-2xl rounded-lg bg-white border-2 p-5 '>
                    <div className='w-full'>
                        <IconButton size={"sm"} icon={<SmallCloseIcon/>} onClick={Close}/>
                    </div>
                    <div className='border-b-2 pb-2 mb-2'>
                        <p className='text-2xl font-medium text-center'>請上傳新圖片</p>
                    </div>
                    <div className='my-10'>
                        <img className='w-52 h-52 object-cover mx-auto rounded-full border-2' alt='avater image' src={imgBuff || img}/>
                    </div>

                    <div className='w-fit mx-auto'>
                        <button className='bg-orange-500 text-white p-2 rounded-lg mx-3' onClick={handleUpdate}>確認更改</button>
                        <button className='bg-gray-400 text-white p-2 rounded-lg mx-3' onClick={updateImg}>上傳圖片</button>
                    </div>
                </div>
            </div>
        </SlideFade>
    )
}

const DisplayTable = () =>{
    const { profile, setPop } = useContext(profile_context);
    const { role, img, handle } = profile || {};

    return(
        <div className='w-64'>
            <div className='w-52 h-52 mx-auto relative'>
                <img className='w-52 h-52 object-cover rounded-full border-2' src={img}/>
                <button className='absolute bottom-3 right-3 bg-black w-10 h-10 rounded-full text-white' onClick={()=>setPop(true)}>
                    <EditIcon mx={'auto'}/>
                </button>
            </div>
            <div className='my-5'>
                <p className="text-base text-slate-400 ">{(role === 1)? "管理員" : "使用者"}</p>
                <p className="w-full text-center text-5xl font-medium text-black-700">{ handle }</p>
            </div>
        </div>
    )
}

export const ImgForm = ()=>{
    return(
        <>
            <DisplayTable/>
            <InputForm/>
        </>
    )
}