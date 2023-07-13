"use client";

import { useState, useEffect } from 'react';
import { Table } from '@/components/table';
import { HOST } from '@/setting';


const ProblemList = () =>{
    const [datas, setData] = useState(null);

    useEffect(()=>{getList()},[])

    const getList = async ()=>{
        const res = await fetch(`${HOST}/api/submition`)

        if(res.ok){
            let json = await res.json();
            let datas = json.map((submit)=>([
                submit.id, 
                submit.problem,
                { lable: submit.user.handle , href: `/profile/${submit.user.handle}`},
                submit.date,
                submit.verdict.verdict,
                submit.verdict.time,
                submit.verdict.memory,
            ]))
            setData(datas);
        }   
    }

    return(
        <Table
            cols={[
                {lable: "提交 ID", width: 10},
                {lable: "題目名稱", width: 20},
                {lable: "提交人", type: "link"},
                {lable: "提交時間", type: "time"},
                {lable: "狀態", type: "status"},
                {lable: "記憶體", type: "mem"},
                {lable: "時長", type: "sec"}
            ]}
            datas={datas}
            line_per_page={10}
        />
    )   
}

export default ProblemList;