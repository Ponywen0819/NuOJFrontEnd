import './loading.css'

export const Loading = ()=>{
    return(
        <div className="w-full h-fit">
            <div className="mx-auto w-fit h-full flex flex-col justify-center">
                <div className="lds-spinner">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <p className="w-fit text-center"></p>
            </div>
        </div>
        
    );
}


