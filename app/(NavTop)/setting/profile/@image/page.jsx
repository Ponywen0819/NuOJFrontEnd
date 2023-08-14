'use client';

import {
    Image,
    Stack,
    Container,
    Center,
    IconButton,
    SmallCloseIcon,
    Button
} from '@/components/chakra';
import { useRef, useContext } from 'react';
import { auth_context } from '@/contexts/auth';
import { img_context } from '../layout';
import { HOST } from '@/setting';
import useSWR from 'swr';
import { success_swal, error_swal } from '@/components/notification';

const imgFetcher = (...arg) => fetch(...arg).then((res)=>{
    if(!res.ok){
        const error = new Error("error on fetching user information")
        error.message = "User Image Not Found"
        throw error;
    }
    return res.blob();
}).then((blob)=> new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>{
        const base64 = reader.result;
        resolve(base64);
    }
    reader.readAsDataURL(blob);
}))

const ImgForm = ()=>{
    const ref = useRef(null);
    const { user } = useContext(auth_context);
    const { handle } = user;
    const { imgPop, setPop } = useContext(img_context);
    const { data: img, mutate } = useSWR(
        `${HOST}/api/profile/${handle}/avatar`, 
        imgFetcher,
        { suspense : true }
    )

    const selectImg = () =>{
        const file_input = document.createElement("input")
        file_input.type = "file"
        file_input.accept = "image/*"
        file_input.onchange = e => {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = readerEvent => {
                ref.current.src = readerEvent.target.result;
            }
            reader.readAsDataURL(image)
        }
        file_input.click();
    }

    const handleUpdate = async () =>{
        if(ref.current.src === img){
            success_swal("大頭照並未更改").then(()=>setPop(false));
            return
        }

        const new_img = ref.current.src;

        const imageBuffer = await fetch(new_img).then((res) =>res.arrayBuffer());
        const mime = new_img.match(/:(.*?);/)[1];
        
        let res = await fetch(`${HOST}/api/profile/${handle}/avatar`, {
            method: "PUT",
            headers: {
                "content-type": mime,
                "content-length": imageBuffer.byteLength,
            },
            body: imageBuffer
        })
        if(res.ok){
            success_swal("大頭照更改成功").then(()=>{
                mutate(new_img, {revalidate: false})
                setPop(false)
            });
        }
        else{
            error_swal("大頭照上傳失敗");
        }
    }

    if(!imgPop) return '';

    return(
        <>
            <Center
                position={'fixed'}
                inset={0}
                backgroundColor={'blackAlpha.400'}
                overflowY={'auto'}
                paddingX={3}
                paddingY={5}
            >
                <Stack
                    gap={3}
                    paddingX={3}
                    paddingY={5}
                    position={'relative'}
                    backgroundColor = {'white'}
                    boxShadow={'sm'}
                    borderRadius={'lg'}
                >
                    <IconButton
                        icon={<SmallCloseIcon/>}
                        backgroundColor={'whiteAlpha.100'}
                        isRound={true}
                        position={'absolute'}
                        top={2}
                        right={2}
                        marginLeft={'auto'} 
                        display={'block'}
                        onClick={()=>setPop(false)}
                    />
                    <Image
                        ref={ref}
                        alt='avater preview'
                        rounded={'full'}
                        fit={'cover'}
                        src={img}
                        boxSize={{base: "3xs", lg: 'xs'}}
                    />
                    <Container w={'fit-content'} display={'flex'} gap={3}>
                        <Button
                            backgroundColor={'orange.400'}
                            color={'whiteAlpha.800'}
                            borderRadius={'lg'}
                            onClick={handleUpdate}
                        >確認更改</Button>
                        <Button
                            backgroundColor={'gray.400'}
                            color={'whiteAlpha.800'}
                            borderRadius={'lg'}
                            onClick={selectImg}
                        >變更圖片</Button>
                    </Container>
                </Stack>
            </Center>
        </>
    )
}

export default ImgForm;