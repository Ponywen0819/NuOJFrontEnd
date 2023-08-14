'use client';

import Editor from '@monaco-editor/react';
import { success_swal, error_swal} from '@/components/notification';
import { Loading } from '@/components/loading';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@chakra-ui/react'
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';


const Select = ({ options = [], len, callback })=>{
    const [pop, setPop] = useState(false);


    return(
        <div className='relative'>
            <Button 
                variant='link'
                rightIcon={<ChevronDownIcon/>}
                onClick={()=>{
                    setPop((v)=>!v)
                }}
            >{ len.text }</Button>
            {pop? (
                <ul className='absolute z-50 border-2 rounded-lg bg-white p-2 max-h-32 overflow-y-auto'>
                    {options.map((opt)=>(
                        <li 
                            className='hover:bg-gray-100 rounded-md p-2' 
                            onClick={()=>{
                                callback(opt)
                                setPop(false)
                            }}
                        >
                            <span className='whitespace-nowrap mr-2'>{opt.text}</span>
                            { opt.text === len.text ? (<CheckIcon className='inline-block'/>) : ''}
                        </li>
                    ))}
                </ul>
            ):''}
        </div>
    )
}

export const SubmitArea = ({ id })=>{
    const support_len = [
        { text: "C++14 (g++)", val: "cpp", default: "// write your answer here"},
        { text: "Python 3.8.4", val: 'python', default: "# write your answer here"},
    ]
    const [len, setLen] = useState(support_len[0]);
    const code_ref = useRef(null);
    useEffect(()=>{
        code_ref.current?.setValue(len.default || '');
    },[len])

    const handleCodeUpload = async (text) =>{
        let res = await fetch(`/api/submit/`, {
            body: JSON.stringify({
                code: text,
                compiler : len.text,
                problem_id : id,
            }),
            method: "POST",
            headers: {"content-type" : "application/json"}
        })

        if(res.ok){
            success_swal("資料上傳成功");
        }
        else{
            error_swal("上傳出現錯誤")
        }
    }

    const handleFileUpload = () =>{
        const file_input = document.createElement("input")
        file_input.type = "file"
        file_input.accept = "*/*"
        file_input.onchange = e => {
            const blob = e.target.files[0];
            const reader = new FileReader();
            reader.onload = readerEvent => {
                const text = readerEvent.target.result;
                handleCodeUpload(text);
            }
            reader.readAsText(blob)
        }
        file_input.click();
    }

    return(
        <div className='flex flex-col h-full'>
            <div className='w-full h-10 flex px-2 border-b-2 flex items-center'>
                <Select options={support_len} len={len} callback={setLen}/>
            </div>
            <div className='grow py-2'>
                <Editor
                    language={len.val}
                    defaultValue={len.default}
                    options={{
                        tabCompletion : 'off',
                        contextmenu: false,
                        quickSuggestions: {
                            other: false,
                            comments: false,
                            strings: false
                          },
                          parameterHints: {
                            enabled: false
                          },
                        suggestOnTriggerCharacters: false,
                        acceptSuggestionOnEnter: "off",
                        tabCompletion: "off",
                        wordBasedSuggestions: false,
                        minimap:{
                            enabled: false
                        },
                        scrollBeyondLastLine: 0,
                    }}
                    loading={<Loading/>}
                    onMount={( editor, monaco )=>{
                        code_ref.current = editor;
                    }}
                    onChange={(val, event)=>{console.log(val, event)}}
                />
            </div>
            <div className='w-fit mx-auto py-2'>
                <button 
                    className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                    onClick={()=>handleCodeUpload(code_ref.current.getValue())}
                > 提交 </button>
                <button 
                    className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                    onClick={handleFileUpload}
                > 上傳檔案 </button>
            </div>
        </div>
    )
}

export default SubmitArea;