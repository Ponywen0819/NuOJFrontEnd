"use client";

import { useState, useEffect } from 'react';
// import { Table } from '@/components/table';
import { Table } from '@/components/table/table';
import { SlideFade } from '@chakra-ui/react';
import { HOST } from '@/setting';
import { Loading } from '@/components/loading';
import Link from 'next/link';
import { Time, Sec} from '@/components/table/types';



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
                date: {data: submit.date},
                verdict: submit.verdict.verdict,
                time: {data: submit.verdict.time},
                memory: submit.verdict.memory,
            }))
            setData(datas);
        }
    }

    return(
        (datas)?(
            <SlideFade in={datas} reverse={true} unmountOnExit={true}>
                <Table
                    rawconfig={[
                        {
                            key: "id",
                            text: "提交 ID", 
                            width: 10
                        },
                        {
                            key: "problem",
                            text: "題目名稱",
                            width: 20
                        },
                        {
                            key: "handle",
                            text: "提交人", 
                            render: (<Link/>),
                        },
                        {
                            key: "date",
                            text: "提交時間", 
                            render: (<Time></Time>),
                        },
                        {
                            key: "verdict",
                            text: "狀態", 
                            type: "status"
                        },
                        {
                            key: "memory",
                            text: "記憶體", 
                            type: "mem"
                        },
                        {
                            key: "time",
                            text: "時長", 
                            render: (<Sec/>)
                        }
                    ]}
                    rawdata={datas}
                    pageSize={10}
                />
            </SlideFade>):(<Loading/>)
    )   
}

export default ProblemList;