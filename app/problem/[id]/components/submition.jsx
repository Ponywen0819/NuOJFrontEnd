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

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SlideFade } from '@chakra-ui/react';
import { HOST } from '@/setting';
import { Loading } from '@/components/loading';


export const SubmitionArea = ({ id })=>{
    const [datas, setData] = useState(null);
    useEffect(()=>{getList()},[])

    const getList = async ()=>{
        const res = await fetch(`${HOST}/api/submition/${id}`)

        if(res.ok){
            let json = await res.json();
            let datas = json.map((submit)=>({
                id: submit.id, 
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
            <SlideFade in={datas} unmountOnExit={true}>
                <Table borderWidth='0px'>
                    <Header height='64px' backgroundColor='white'>
                        <HeaderColumn>提交 ID</HeaderColumn>
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
                </Table>
            </SlideFade>
            { datas? '' : <Loading/> }
        </>
    )
}

