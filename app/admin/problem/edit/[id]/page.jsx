'use client'

import { Subnav, Tab } from '@/components/subnav';
import { useEffect, useRef, useState, forwardRef} from 'react';
import { HOST } from '@/setting';
import { error_swal, success_swal } from '@/components/notification';
import { SlideFade } from '@chakra-ui/react';
import { Loading } from '@/components/loading';
import { useRouter } from 'next/navigation';


const InputLine = forwardRef(({
    initialval = '',
    title,
    ...props
}, ref) =>{
    const val_ref = ref || useRef();
    useEffect(()=>{
        val_ref.current.value = initialval
    },[initialval]);

    return(
        <div className='flex'>
            <div className='w-40'>
                <p>{title}</p>
            </div>
            <textarea 
                className='grow p-2 h-fit min-h-[64px] border-2 rounded-lg' 
                ref={val_ref} 
            />
        </div>
    )
})

const EditProblemPage = ({ params })=>{
    const { id } = params;
    const [ detail, setDetail] = useState(null)
    const cols = [
        { title: "標題", key: 'title'},
        { title: "執行時長限制", key: 'time_limit'},
        { title: "記憶體限制", key: 'memory_limit'},
        { title: "題目敘述", key: 'description'},
        { title: "輸入敘述", key: 'input_description'},
        { title: "輸出敘述", key: 'output_description'},
        { title: "note", key: 'note'},
    ].map((col)=>({...col, ref: useRef(null)}));


    const router = useRouter

    useEffect(()=>{getProblem()},[])

    const getProblem = async ()=>{
        const res = await fetch(`${HOST}/api/problem/${id}`)
        if(!res.ok){
            error_swal("取得題目資訊出現問題");
            return;
        }
        const json = await res.json();
        setDetail({
            title: json.header.title ,
            time_limit: json.header.time_limit.toString() ,
            memory_limit: json.header.memory_limit.toString() ,
            description: json.content.description ,
            input_description: json.content.input_description ,
            output_description: json.content.output_description ,
            note : json.content.note ,
        });
    }

    const handleUpdate = async () =>{
        const data = cols.filter((col)=>{
            const { ref, key } = col;
            const value = ref.current.value;
            return !(value === detail[key]) 
        }).reduce((a, c)=>{
            const { key, ref } = c;
            const val = ref.current.value;
            if(["title", "time_limit", "memory_limit"].includes(key)){
                if(!a['header'])a['header'] = {}; 
                a['header'][key] = val;
            }else{    
                if(!a['content'])a['content'] = {}; 
                a['content'][key] = val;
            }
            return a;
        },{})

        const res = await fetch(`${HOST}/api/problem/${id}`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                "content-type": "application/json"
            }
        })

        if(!res.ok){
            error_swal("上傳出現錯誤")
            return;
        }

        success_swal("更改成功")
    }


    return(
        <>
            <Subnav>
                <Tab href={'/admin/problem/list'}>題目列表</Tab>
                <Tab href={'/admin/problem/add'}>新增題目</Tab>
                <Tab href={'#'} isActive={true}>修改題目</Tab>
            </Subnav>
            <div className="bg-white rounded-lg border-2 px-3 py-5 ">
                <div className='py-2 mb-4'>
                    <p className='text-3xl'>{`題目 ID : ${id}`}</p>
                </div>
                <SlideFade in={detail} unmountOnExit={true} className='flex flex-col gap-2'>
                    {
                        cols.map((col)=><InputLine ref={col.ref} title={col.title} initialval={detail?.[col.key]} />)
                    }
                    <div className='mx-auto w-fit'>
                        <button 
                            className='bg-orange-500 text-white p-2 rounded-lg mx-3'
                            onClick={()=>{
                                handleUpdate()
                            }}
                        >確認更改</button>
                        <button
                            className='bg-gray-400 text-white p-2 rounded-lg mx-3' 
                            onClick={()=>{router.push(`/admin/problem/list`)}}
                        >取消</button>
                    </div>
                </SlideFade>
                { detail ? "" : <Loading/> }
            </div>
        </>
    )
}

export default EditProblemPage;