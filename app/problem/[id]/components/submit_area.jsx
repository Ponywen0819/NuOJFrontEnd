import Editor from '@monaco-editor/react';
import { Loading } from '@/components/loading';

export const SubmitArea = ()=>{
    return(
        <div className="w-1/2 border-2 rounded-lg text-lg flex flex-col gap-10 p-10 shadow bg-white">
            <Editor
                defaultLanguage="javascript"
                defaultValue="// some comment"
                options={{
                    minimap:{
                        enabled: false
                    },
                    scrollBeyondLastLine: 0
                }}
                loading={<Loading/>}
            />
            <div className='w-fit mx-auto'>
                <button 
                    className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                > 提交 </button>
                <button 
                    className="inline-block bg-orange-700 w-32 delay-100 py-2 hover:bg-orange-500 rounded-lg text-white mx-5"
                > 上傳檔案 </button>
            </div>
        </div>
    )
}