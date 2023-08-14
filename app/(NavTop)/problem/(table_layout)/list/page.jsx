"use client";

import { useState } from 'react';
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
import { Subnav, Tab } from '@/components/subnav';
import useSWR from 'swr';

const fetcher = (...arg) => fetch(...arg).then(res=>{
    if(!res.ok){
        const error = new Error("error on fetching problem list")
        error.message = "can't get problem list"
        throw error;
    }

    return res.json();
}).then(json=>{
    return json.map((problem)=>({
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
})

const List = ()=>{
    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'
    const { data: problems } = useSWR(`${HOST}/api/problem`, fetcher, { suspense: true })
    return(problems.map((problem)=>(
        <Row key={problem.id}>
            <Cell>{problem.id}</Cell>
            <Cell as={<NextLink/>} href={problem.title.href} className={link_class}>
                {problem.title.text}
            </Cell>
            <Cell as={<NextLink/>} href={problem.author.href} className={link_class}>
                {problem.author.text}
            </Cell>
        </Row>
    )))
}

const ProblemList = () =>{
    return(
        <>
            <Subnav>
                <Tab href={'/problem/list'} isActive={true}>題目列表</Tab>
                <Tab href={'/problem/submition'}  >提交狀態</Tab>
            </Subnav>
            <SlideFade in={true}>
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
                            <Body pageSize={30}>
                                <List/>
                            </Body>
                            <Selector/>
                        </Table>
                    </Box>
            </SlideFade>
        </>
    )
}

export default ProblemList;