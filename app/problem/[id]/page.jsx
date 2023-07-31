"use client";

import { useState, useEffect } from 'react';
import { MathComponent } from 'mathjax-react';
import { Loading } from '@/components/loading';
import NotFound from './not-found';
import { HOST } from '@/setting';

const TexSupport = ({text}) =>{
    let res = [];
    let from = 0;
    text.slice(from).replaceAll(/(\$.*\$)/g,(match, _, offset, string) =>{
        if(offset !== 0){
            res.push(<span>{string.slice(0, offset - 1)}</span>);
        }
        res.push(<MathComponent display={false} tex={match.slice(1, -1)}/>);
        from += match.length + offset;
    });
    
    if(from !== text.length){
        res.push(<span>{text.slice(from)}</span>);
    }

    return (<p className='py-1'>{res}</p>);
}

const ProblemDetail = ({ params })=>{
    let id = params.id;
    const [data, setData] = useState({status: 0});

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
            setData({status: -1});
        }
    }

    const lines = [
        {key: "description", lable: '題目敘述'},
        {key: "input_description", lable: '輸入說明'},
        {key: "output_description", lable: '輸出說明'},
        {key: "note", lable: '備註'}
    ]

    switch (data.status){
        case 1:
            return(
                <div className="flex gap-5 h-full">
                    <div className="w-1/2 rounded-lg border-2 shadow flex flex-col p-10 gap-10 bg-white ">
                        <div className="text-center">
                            <p id="title" className="text-4xl font-medium my-2"> {data?.title} </p>
                            <p id="TL-text" className="text-lg font-medium my-2"> 程式運行時間限制（TL）：{data?.tl} 秒</p>
                            <p id="ML-text" className="text-lg font-medium my-2"> 程式運行時間限制（ML）：{data?.ml} MB</p>
                        </div>
                        {
                            lines.map((line)=>{
                                return(
                                    <div key={`${line.key}`}>
                                        <p className="text-xl font-semibold my-5">{line.lable}</p>
                                        {
                                            data?.[line.key].split("\n").map((l,index)=>(
                                                <TexSupport key={`${line.key}:${index}`} text={l}/>
                                            ))
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-1/2 h-full border-2 rounded-lg text-lg flex flex-col gap-10 p-10 shadow bg-white">
                        
                        <div className='w-fit mx-auto'>
                            <button 
                                className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                            > 提交 </button>
                            <button 
                                className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                            > 上傳檔案 </button>
                        </div>
                    </div>
                </div>
            )
        case -1:
            return <NotFound></NotFound>
        default:
            return <Loading/>               

    }
}

export default ProblemDetail;