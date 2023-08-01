"use client";

import { useState, useEffect, useRef } from 'react';
import { Loading } from '@/components/loading';
import NotFound from './not-found';
import { HOST } from '@/setting';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SlideFade } from '@chakra-ui/react';
import { DocArea } from './components/doc';
import { SubmitArea } from './components/submit';
import { SubmitionArea } from './components/submition';

const ProblemDetail = ({ params })=>{
    let id = params.id;
    const [data, setData] = useState(null);
    const code_ref = useRef();

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
            <SlideFade in={data} className="flex gap-5 w-full grow" unmountOnExit={true}>
                {
                    (data?.status)?(
                        <>
                            <div className="w-1/2 border-2 rounded-lg shadow bg-white flex flex-col">
                                <Tabs isLazy colorScheme={"orange"}>
                                    <TabList marginBottom={"24px"}>
                                        <Tab>題目敘述</Tab>
                                        <Tab>繳交狀態</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <DocArea data={data}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <SubmitionArea id={id}/>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                            <div className="w-1/2 border-2 rounded-lg shadow bg-white flex flex-col">
                                <SubmitArea id={id} code_ref={code_ref}/>
                            </div>
                        </>
                    ):
                    (<NotFound/>)
                }
            </SlideFade>
            {(data)? "" : (<Loading/>)}
        </>
    )
}

export default ProblemDetail;