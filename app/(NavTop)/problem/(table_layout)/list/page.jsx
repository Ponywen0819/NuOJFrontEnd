"use client";

import { useState } from 'react';
// import { Table } from '@/components/table';
import { Table } from '@/components/table/table';
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
                title: { text: problem.data.content.title, href: `/problem/${problem.id}`},
                author: { text: problem.data.author.handle, href: `/profile/${problem.data.author.handle}`},
            }))
            setData(datas)
        }   
    }
    const link_class = 'border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1'

    return datas?(
        <SlideFade in={datas} reverse={true} unmountOnExit={true}>
            <Table
                rawconfig={[
                    {
                        text: "題目 ID", 
                        key: "id", 
                        width: 10
                    },
                    {
                        text: "題目名稱", 
                        key: "title", 
                        type: "link",
                        render: (<Link className={link_class}/>)
                    },
                    {
                        text: "題目作者", 
                        key: "author", 
                        type: "link",
                        width: 10,
                        render: (<Link className={link_class}/>),
                    },
                    {
                        text: "題目標籤", 
                        key: "lable"
                    }
                ]}
                rawdata={datas}
                pageSize={10}
            />
        </SlideFade>
    ):(<Loading/>)
}

export default ProblemList;