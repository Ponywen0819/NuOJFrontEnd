import { Table } from '@/components/table/table';
import { Time, Sec } from '@/components/table/types';
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
                date: {data: submit.date},
                verdict: submit.verdict.verdict,
                time: {data: submit.verdict.time},
                memory: submit.verdict.memory,
            }))
            setData(datas);
        }
    }

    return(
        <>
            <SlideFade in={datas} unmountOnExit={true}>
            <Table rawconfig={[
                    {
                        key: "id",
                        text: "提交 ID", 
                        width: 10
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
            </SlideFade>
            { datas? '' : <Loading/> }
        </>
    )
}

