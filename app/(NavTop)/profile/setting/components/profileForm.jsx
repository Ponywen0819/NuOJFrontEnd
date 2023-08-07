import { error_swal, success_swal } from '@/components/notification';
import { useContext, useRef, useEffect } from 'react';
import { profile_context } from '../page';
import{
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Heading,
    Flex,
    Divider
} from '@/components/chakra'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { HOST } from '@/setting';

export const ProfileForm = ({ 
    initial,
    handle
}) => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
    } = useForm();

    const handleProfileUpdate = async (data) => {
        let res = await fetch(`${HOST}/api/profile/${handle}`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        if(res.ok){
            success_swal("更新成功");
        }
        else error_swal("上傳發生問題");
    }

    return(
        <Flex 
            as='form'
            onSubmit={handleSubmit(handleProfileUpdate)}
            flex={1}
            height={'fit-content'}
            gap={3}
            direction={'column'}
            boxShadow={'sm'}
            backgroundColor={'whiteAlpha.900'}
            borderRadius={'lg'}
            borderWidth={"1px"}
            paddingX={3}
            paddingY={5}
        >
            <Box>
                <Heading as='h1'>修改個人資訊</Heading>
                <Divider marginY={3}/>
            </Box>
            <Box flex={1}>
                <FormControl>
                    <FormLabel>學校</FormLabel>
                    <Input
                        type='text'
                        defaultValue={initial.school}
                        id='school'
                        {...register('school')}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>自我介紹</FormLabel>
                    <Input 
                        type='text'
                        id='bio'
                        defaultValue={initial.bio}
                        {...register('bio')}
                    />
                </FormControl>
            </Box>
            <Flex
                width={'fit'}
                gap={3}
                margin={'auto'}
            >
                <Button  
                    type='submit'
                    display={'block'}
                    backgroundColor={'orange.400'}
                    color={'whiteAlpha.800'}
                    borderRadius={'lg'}
                >確認更改</Button>
                <Button
                    onClick={()=>router.push(`/profile/${handle}`)}
                    height={10}
                    paddingX={4}
                    backgroundColor={'gray.400'}
                    color={'whiteAlpha.800'}
                    borderRadius={'lg'}
                >取消</Button>
            </Flex>
        </Flex>
    )
}
