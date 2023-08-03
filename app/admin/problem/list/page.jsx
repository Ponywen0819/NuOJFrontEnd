'use client'

import {
    Table,
    Header,
    HeaderColumn,
    Body,
    Row,
    Cell,
    Selector
} from '@/components/table';
import { 
    Subnav,
    Tab
} from '@/components/subnav';
import { error_swal, success_swal } from '@/components/notification';
import { IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { HOST } from '@/setting';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

import logo_min from '@/public/logo_min.png';
import { useRouter } from 'next/navigation';



const ListPage = ()=>{
    const [problems, setProblems] = useState(null);
    const router = useRouter();

    useEffect(()=>{ getProblems() }, []);

    const getProblems = async () =>{
        const res = await fetch(`${HOST}/api/problem`);
        if(!res.ok){
            error_swal("取得題目出現問題");
            return;
        }

        const json = await res.json();
        const problems = json.map((problem)=>({
            id : problem.header.problem_pid,
            title : problem.header.title,
        }))
        setProblems(problems);
    }

    const deleteProblem = async (id)=>{
        const res = await fetch(`${HOST}/api/problem/${id}`, {
            method: "DELETE"
        })

        if(!res.ok){
            error_swal("出現預期外的錯誤")
        }
        setProblems((old)=>old.filter((problem)=>(problem.id !== id)))
        success_swal("刪除成功")
    }

    return(
        <>
            <Subnav>
                <Tab href={'/admin/problem/list'} isActive={true}>題目列表</Tab>
                <Tab href={'/admin/problem/add'}>新增題目</Tab>
            </Subnav>
            <div className='flex gap-3'>
                <div className='grow'>
                    <Table height='fit-content'>
                        <Header>
                            <HeaderColumn width='10%'>題目 ID</HeaderColumn>
                            <HeaderColumn>題目名稱</HeaderColumn>
                            <HeaderColumn width='20%'>操作</HeaderColumn>
                        </Header>
                        <Body pageSize={10}>
                        {
                            problems?.map((problem)=>(
                                <Row key={problem.id}>
                                    <Cell>{problem.id}</Cell>
                                    <Cell>{problem.title}</Cell>
                                    <Cell>
                                        <IconButton 
                                            icon={<EditIcon/>}
                                            onClick = {()=>{
                                                router.push(`/admin/problem/edit/${problem.id}`)
                                            }}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon/>}
                                            onClick = {()=>{
                                                Swal.fire({
                                                    title: "是否刪除",
                                                    showCancelButton: true,
                                                    confirmButtonText: '確認',
                                                    cancelButtonText: '取消',
                                                    confirmButtonColor: 'rgb(249 115 22)',
                                                    cancelButtonColor: 'rgb(156 163 175)',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        Swal.fire({
                                                          title: '處理中',
                                                          timerProgressBar: true,
                                                          showConfirmButton: false,
                                                        })
                                                        deleteProblem(problem.id);
                                                    }
                                                })
                                            }}
                                        />
                                    </Cell>
                                </Row>
                            ))
                        }
                        </Body>
                        <Selector/>
                    </Table>
                </div>
                <aside className="w-72 h-fit">
                    <div className='bg-white w-full rounded-xl p-3'>
                        <Image width={128} height={128} alt='' className="mx-auto" src={logo_min}/>
                        <p className="text-2xl text-center p-5"> NuOJ Lab </p>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default ListPage;