"use client";

import { useState } from 'react';
// import { Table } from '@/components/table';
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
    Box,
} from '@/components/chakra';
import { useEffect } from 'react';
import { SlideFade } from '@chakra-ui/react';
import NextLink from 'next/link';

import { HOST } from '@/setting';
import { Loading } from '@/components/loading';
import { Subnav, Tab } from '@/components/subnav';


const ProblemList = () =>{
    const [datas, setData] = useState(null);

    useEffect(()=>{
        getList()
    },[])

    const getList = async ()=>{
        let res = await fetch(`${HOST}/api/problem`,{
            method: "GET"
        })

        if(res.ok){
            let json = await res.json();
            let datas = json.map((problem)=>({
                id: problem.header.problem_pid, 
                title: { 
                    text: problem.header.title, 
                    href: `/problem/${problem.header.problem_pid}`
                },
                author: { 
                    text: problem.author.handle, 
                    href: `/profile/${problem.author.handle}`
                },
            }))
            setData(datas)
        }   
    }
    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'

    return(
        <>
            <Subnav>
                <Tab href={'/problem/list'} isActive={true}>題目列表</Tab>
                <Tab href={'/problem/submition'}  >提交狀態</Tab>
            </Subnav>
            <SlideFade in={datas}>
                <Box width={'100%'} overflowX={'auto'}>
                    <Box width={{base: 'container.lg', lg: '100%'}}>
                        <Table>
                            <Header height='64px'>
                                <HeaderColumn
                                    width = {'10%'}
                                >題目 ID</HeaderColumn>
                                <HeaderColumn>題目名稱</HeaderColumn>
                                <HeaderColumn>題目作者</HeaderColumn>
                                <HeaderColumn>題目標籤</HeaderColumn>
                            </Header>
                            <Body
                                pageSize={30}
                            >
                                {datas?.map((data)=>(
                                    <Row>
                                        <Cell>{data.id}</Cell>
                                        <Cell as={<NextLink/>} href={data.title.href} className={link_class}>
                                            {data.title.text}
                                        </Cell>
                                        <Cell as={<NextLink/>} href={data.author.href} className={link_class}>
                                            {data.author.text}
                                        </Cell>
                                    </Row>
                                ))}
                            </Body>
                            <Selector/>
                        </Table>
                    </Box>
                </Box>
            </SlideFade>
            {datas? '' : <Loading/>}
        </>
    )
}

export default ProblemList;