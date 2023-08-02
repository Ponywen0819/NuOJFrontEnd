"use client";

import { useState } from 'react';
// import { Table } from '@/components/table';
import { Table, Header, HeaderColumn, Body, Row, Cell, Selector } from '@/components/table';
import { useEffect } from 'react';
import { SlideFade } from '@chakra-ui/react';
import Link from 'next/link';

import { HOST } from '@/setting';
import { Loading } from '@/components/loading';



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
                id: problem.id, 
                title: { 
                    text: problem.data.content.title, 
                    href: `/problem/${problem.id}`
                },
                author: { 
                    text: problem.data.author.handle, 
                    href: `/profile/${problem.data.author.handle}`
                },
            }))
            setData(datas)
        }   
    }
    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'

    return datas?(
        // <SlideFade in={datas} reverse={true} unmountOnExit={true}>
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
                    {datas.map((data)=>(
                        <Row>
                            <Cell>{data.id}</Cell>
                            <Cell as={<Link/>} href={data.title.href} className={link_class}>
                                {data.title.text}
                            </Cell>
                            <Cell as={<Link/>} href={data.author.href} className={link_class}>
                                {data.author.text}
                            </Cell>
                        </Row>
                    ))}
                </Body>
                <Selector/>
            </Table>
        // </SlideFade>
    ):(<Loading/>)
}

export default ProblemList;