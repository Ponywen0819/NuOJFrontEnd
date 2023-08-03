"use client";

import { useState, useEffect } from 'react';
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

import { SlideFade } from '@chakra-ui/react';
import { HOST } from '@/setting';
import { Loading } from '@/components/loading';
import Link from 'next/link';
import { Subnav, Tab } from '@/components/subnav';

const ProblemList = () =>{
    const [datas, setData] = useState(null);
    useEffect(()=>{getList()},[])

    const getList = async ()=>{
        const res = await fetch(`${HOST}/api/submition`)

        if(res.ok){
            let json = await res.json();
            let datas = json.map((submit)=>({
                id: submit.id, 
                problem: submit.problem,
                handle: { text: submit.user.handle , href: `/profile/${submit.user.handle}`},
                date: submit.date,
                verdict: submit.verdict.verdict,
                time: submit.verdict.time,
                memory: submit.verdict.memory,
            }))
            setData(datas);
        }
    }

    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'

    return(
        <>
            <Subnav>
                <Tab href={'/problem/list'} >題目列表</Tab>
                <Tab href={'/problem/submition'} isActive={true} >提交狀態</Tab>
            </Subnav>
            <SlideFade in={datas}>
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
                    <Body
                        pageSize={30}
                    >
                        {datas?.map((data)=>(
                            <Row>
                                <Cell>{data.id}</Cell>
                                <Cell>{data.problem}</Cell>
                                <Cell as={<Link/>} href={data.handle.href} className={link_class}>
                                    {data.handle.text}
                                </Cell>
                                <Cell as={<Date/>}>{data.date}</Cell>
                                <Cell>{data.verdict}</Cell>
                                <Cell as={<Time/>}>{data.time}</Cell>
                                <Cell>{data.memory}</Cell>
                            </Row>
                        ))}
                    </Body>
                    <Selector/>
                </Table>
            </SlideFade>
            { datas ? '' : <Loading/> }
        </>
    )   
}

export default ProblemList;