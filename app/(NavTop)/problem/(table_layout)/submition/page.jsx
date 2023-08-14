"use client";

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
    Date,
    Time
} from '@/components/table/types';
import {
    SlideFade,
    Box
} from '@/components/chakra';
import { HOST } from '@/setting';
import Link from 'next/link';
import { Subnav, Tab } from '@/components/subnav';
import useSWR from 'swr';

const fetcher = (...arg) => fetch(...arg).then((res)=>{
    if(!res.ok){
        const error = new Error("error on fetching submition list")
        error.message = "Can't get submition list"
        throw error;
    }

    return res.json();
}).then((json)=>{
    return json.map((submit)=>({
        id: submit.id, 
        problem: submit.problem,
        handle: { text: submit.user.handle , href: `/profile/${submit.user.handle}`},
        date: submit.date,
        verdict: submit.verdict.verdict,
        time: submit.verdict.time,
        memory: submit.verdict.memory,
    }))
})

const List = () =>{
    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'
    const { data: submitions } = useSWR(`${HOST}/api/submition`, fetcher, { suspense: true })
    return(submitions.map((submition)=>(
        <Row>
            <Cell>{submition.id}</Cell>
            <Cell>{submition.problem}</Cell>
            <Cell as={<Link/>} href={submition.handle.href} className={link_class}>
                {submition.handle.text}
            </Cell>
            <Cell as={<Date/>}>{submition.date}</Cell>
            <Cell>{submition.verdict}</Cell>
            <Cell as={<Time/>}>{submition.time}</Cell>
            <Cell>{submition.memory}</Cell>
        </Row>
    )))
}

const ProblemList = () =>{
    return(
        <>
            <Subnav>
                <Tab href={'/problem/list'} >題目列表</Tab>
                <Tab href={'/problem/submition'} isActive={true} >提交狀態</Tab>
            </Subnav>
            <SlideFade in={true}>
                <Box width={{base: 'container.lg', lg: '100%'}}>
                    <Table>
                        <Header height='64px'>
                            <HeaderColumn width = {'10%'} >題目 ID</HeaderColumn>
                            <HeaderColumn width='20%'>題目名稱</HeaderColumn>
                            <HeaderColumn>提交人</HeaderColumn>
                            <HeaderColumn>提交時間</HeaderColumn>
                            <HeaderColumn>狀態</HeaderColumn>
                            <HeaderColumn>記憶體</HeaderColumn>
                            <HeaderColumn>時長</HeaderColumn>
                        </Header>
                        <Body pageSize={30} >
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