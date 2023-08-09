'use client';

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Heading,
    Divider,
    Button,
    Flex,
    FormErrorMessage
} from '@/components/chakra';
import { Subnav, Tab } from '@/components/subnav';
import { useForm } from 'react-hook-form';
import { HOST } from '@/setting';
import { error_swal, success_swal } from '@/components/notification';

const AddProblemPage = () => {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting } 
    } = useForm();

    const handleAdd = async (data) =>{
        const { title, time_limit, memory_limit, ...remain } = data;
        const res = await fetch(`${HOST}/api/problem` , { 
            method: "POST",
            headers:{
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                header:{
                    title,
                    time_limit,
                    memory_limit
                },
                content: remain
            })
        });

        if(!res.ok){
            error_swal("上傳發生錯誤")
            return
        }

        success_swal("新增成功")

    }

    return(
        <>
            <Subnav>
                <Tab href={'/admin/problem/list'} >題目列表</Tab>
                <Tab href={'/admin/problem/add'} isActive={true}>新增題目</Tab>
            </Subnav>
            <Stack 
                as='form' 
                boxShadow={'sm'} 
                paddingX={3}
                paddingY={5} 
                backgroundColor={'white'}
                rounded={'lg'}
                gap={3}
                onSubmit={handleSubmit(handleAdd)}
            >
            <Heading as={'h1'}>新增題目</Heading>
            <Divider/>
            <FormControl isInvalid={errors.title}>
                <FormLabel>標題</FormLabel>
                <Input placeholder='請輸入題目' {...register("title",{
                        required: '不可留空',
                })}/>
                <FormErrorMessage>
                    { errors.title && errors.title.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.time_limit}>
                <FormLabel>時間限制</FormLabel>
                <Input 
                    type='text'  
                    placeholder='請輸入時間限制' 
                    {...register("time_limit",{
                        required: '不可留空',
                        pattern:{
                            value: /^[1-9]+[0-9]*$/,
                            message: '請輸入正整數'
                        }
                    })}
                />
                <FormErrorMessage>
                    { errors.time_limit && errors.time_limit.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.memory_limit}>
                <FormLabel>記憶體限制</FormLabel>
                <Input 
                    type='text' 
                    placeholder='請輸入記憶體限制'
                    {...register("memory_limit",{
                        required: '不可留空',
                        pattern:{
                            value: /^[1-9]+[0-9]*$/,
                            message: '請輸入正整數'
                        }
                    })}
                />
                <FormErrorMessage>
                    {errors.memory_limit && errors.memory_limit.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl>
                <FormLabel>題目敘述</FormLabel>
                <Textarea placeholder='請輸入題目' {...register("description",{
                    required: '不可留空'
                })}/>
            </FormControl>
            <FormControl>
                <FormLabel>輸入敘述</FormLabel>
                <Textarea placeholder='請輸入題目' {...register("input_description",{
                    required: '不可留空'
                })}/>
            </FormControl>
            <FormControl>
                <FormLabel>輸出敘述</FormLabel>
                <Textarea placeholder='請輸入題目' {...register("output_description",{
                    required: '不可留空'
                })}/>
            </FormControl>
            <FormControl>
                <FormLabel>Note</FormLabel>
                <Textarea placeholder='請輸入題目' {...register("note")}/>
            </FormControl>

            <Flex width={'fit-content'} marginX={'auto'} gap={3}>
                <Button
                    type='submit' 
                    colorScheme='orange' 
                    isLoading={isSubmitting}
                >新增</Button>
                <Button 
                    type='reset' 
                    colorScheme='gray'
                    isLoading={isSubmitting}
                >清除</Button>
            </Flex>
            </Stack>
        </>
    )
}

export default AddProblemPage;