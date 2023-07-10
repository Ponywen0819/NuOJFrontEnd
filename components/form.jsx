"use client"

import logo_min from '@/public/logo_min.png'
import { useEffect, useRef, useState, useContext } from "react"
import Link from 'next/link'
import Image from 'next/image';
import { HOST } from '@/setting';
import { oauth_context } from '@/contexts/oauth';

const Input = ({
    data_key,
    placeholder,
    type,
    callback
})=>{
    const val_ref = useRef(null);

    let input_class = "w-full bg-slate-100 p-2 text-base px-4 border-2 border-gray-600 appearance-none resize-none overflow-y-hidden rounded focus:outline-none focus:bg-white"
    return(
        <div className="flex gap-1 flex-col">
            <input 
                type={type}
                className={input_class} 
                placeholder={placeholder} 
                ref={val_ref}
                onChange={()=>{callback(data_key, val_ref.current.value)}}
            />
            {/* <AccountValidNotice account={account}/> */}
        </div>
    )
}

const FormBtn = ({title, color}) => {
    const oauth = useContext(oauth_context);

    // ["bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-red-500"];
    // ["hover:bg-blue-300", "hover:bg-orange-300", "hover:bg-purple-300", "hover:bg-red-300"];
    let account_btn_class = `bg-${color}-500 hover:bg-${color}-300 w-full text-white text-lg p-2 rounded my-2 duration-150 `

    return(
        <div className="mt-10 flex flex-col text-center">
            <button type="submit" className={account_btn_class}> {title} </button>
            {oauth.github_oauth_url ? (<a id="viaGithub" href={oauth.github_oauth_url} className="w-full bg-black text-white text-lg p-2 rounded my-2 duration-150 hover:bg-gray-800">{ `使用 Github OAuth 進行${title}` }</a>): ''} 
            {oauth.google_oauth_url ? (<a id="viaGoogle" href={oauth.google_oauth_url} className="w-full bg-gray-300 text-black text-lg p-2 rounded my-2 duration-150 hover:bg-gray-200">{ `使用 Google OAuth 進行${title}` }</a>): ''}
        </div>
    )
}

export const Form = ({
    title,
    inputs,
    color,
    feet,
    callback
})=>{
    const [info, setInfo] = useState(null);

    useEffect(()=>{
        let infos = inputs.reduce((obj, v) =>(
            {...obj, [v.key] : ""}
        ),{})
        setInfo(infos)
    },[]);

    const handleInput = (key, val)=>{
        setInfo((old_val)=>{
            old_val[key] = val
            let new_val = old_val;
            return new_val;
        });
    }

    let logo_class = "mx-auto hover:bg-slate-200 rounded-lg p-3 transition-all duration-500"
    let form_calss = "max-w-2xl w-2/5 bg-white bg-opacity-100 rounded p-10 pb-3 h-fit m-auto"
    return(
        <form className={form_calss} onSubmit={(e)=>{e.preventDefault();return callback(info)}}>
            <div className="pb-5">
                <Link href="/">
                    <Image height={128} width={128} className={logo_class} src={logo_min.src} />
                </Link>
            </div>
            <p className="text-4xl text-center mb-10"> {title} </p>
            <div className="mt-10 flex flex-col gap-5">
                {
                    inputs.map((input)=>(
                        <Input 
                            key={input.key}
                            data_key={input.key}
                            placeholder={input.placeholder}
                            type={input.type}
                            callback={handleInput} 
                        />
                    ))
                }
            </div>
            <FormBtn title={title} color={color}/>
            <div>
                {
                    feet.map((foot)=>(
                        <Link className="w-full text-center" href={foot.url} key={foot.url}>
                            <p className="text-gray-500 mt-10">{foot.content}</p>
                        </Link>
                    ))
                }
            </div>
        </form>
    )
}