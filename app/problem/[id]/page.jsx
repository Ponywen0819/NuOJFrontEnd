"use client";

import { useState, useEffect } from 'react';
import { Loading } from '@/components/loading';
import NotFound from './not-found';
import { HOST } from '@/setting';

import { SlideFade } from '@chakra-ui/react';
import { DocArea } from './components/doc_area';
import { SubmitArea } from './components/submit_area';

const ProblemDetail = ({ params })=>{
    let id = params.id;
    const [data, setData] = useState(null);

    useEffect(()=>{
        getInfo()
    },[]);

    const getInfo = async () => {
        let res = await fetch(`${HOST}/api/problem/${id}`);

        if(res.ok){
            let json = await res.json();
            let info = {
                "description": json.data.content.description,
                "input_description": json.data.content.input_description,
                "output_description": json.data.content.output_description,
                "note": json.data.content.note,
                "title": json.data.content.title,
                "tl": json.data.setting.time_limit,
                "ml": json.data.setting.memory_limit
            }
            setData({...info, status:1});
        }
        else{
            setData({status: 0});
        }
    }

    

    return(
        <>
            <SlideFade in={data} className='h-full'>
                <div className="flex gap-5 h-full">
                    {
                        (data?.status)?(
                            <>
                                <DocArea/>
                                <SubmitArea/>
                            </>
                        ):
                        (<NotFound/>)
                    }
                </div>
            </SlideFade>
            {(data)? "" : (<Loading/>)}
        </>
    )
}

export default ProblemDetail;