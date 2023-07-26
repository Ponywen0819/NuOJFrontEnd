"use client";

import { useState } from 'react';
import { Table } from '@/components/table';
import { useEffect } from 'react';
import { SlideFade } from '@chakra-ui/react';

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
            let datas = json.map((problem)=>([
                problem.id, 
                { lable: problem.data.content.title, href: `/problem/${problem.id}`},
                { lable: problem.data.author.handle, href: `/profile/${problem.data.author.handle}`},
                ""
            ]))
            setData(datas)
        }   
    }

    return datas?(
        <SlideFade in={datas} reverse={true} unmountOnExit={true}>
            <Table
                cols={[
                    {lable: "題目 ID", width: 10},
                    {lable: "題目名稱", type: "link"},
                    {lable: "題目作者", type: "link", width: 10},
                    {lable: "題目標籤"}
                ]}
                datas={datas}
                line_per_page={10}
            />
        </SlideFade>
    ):(<Loading/>)
}

export default ProblemList;