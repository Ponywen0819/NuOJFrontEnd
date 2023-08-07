'use client';

import {
    Box,
    Flex,
    Image,
    Stack,
    Container,
    Center,
    Text,
    SlideFade,
    IconButton,
    SmallCloseIcon,
    Button
} from '@/components/chakra';
import { useState } from 'react';
import { HOST } from '@/setting';
import { success_swal, error_swal } from '@/components/notification';

export const ImgForm = ({ 
    initial,
    handle,
    close,
    updateImg
})=>{
    const [img, setImg] = useState(initial);

    const selectImg = () =>{
        const file_input = document.createElement("input")
        file_input.type = "file"
        file_input.accept = "image/*"
        file_input.onchange = e => {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = readerEvent => {
                setImg(readerEvent.target.result);
            }
            reader.readAsDataURL(image)
        }
        file_input.click();
    }

    const handleUpdate = async () =>{
        if(!img){
            success_swal("大頭照並未更改").then(()=>close());
            return
        }

        const imageBuffer = await fetch(img).then((res) =>res.arrayBuffer());
        const mime = img?.match(/:(.*?);/)[1];
        
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
                updateImg(img)
                close()
            });
        }
        else{
            error_swal("大頭照上傳失敗");
        }
    }

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
                        onClick={close}
                    />
                    <Image 
                        alt='avater preview' 
                        src={img}
                        rounded={'full'}
                        fit={'cover'}
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

