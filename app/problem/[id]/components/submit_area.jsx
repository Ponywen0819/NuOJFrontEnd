import Editor from '@monaco-editor/react';
import { success_swal, error_swal} from '@/components/notification';
import { Loading } from '@/components/loading';
import { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react'

export const SubmitArea = ({ code_ref, id })=>{
    const support_len = [
        { text: "C++14 (g++)", val: "cpp", default: "// write your answer here"},
        { text: "Python 3.8.4", val: 'python', default: "# write your answer here"}
    ]
    const [len, setLen] = useState(support_len[0]);

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
        <div className="w-1/2 border-2 rounded-lg text-lg flex flex-col gap-10 p-10 shadow bg-white">
            <Select onChange={(e)=>{
                const { value } = e.target;
                setLen(support_len[value]);
            }}>
                {
                    support_len.map((len, index)=><option value={index}>{len.text}</option>)
                }
            </Select>
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
                className='grow'
            />
            <div className='w-fit mx-auto'>
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