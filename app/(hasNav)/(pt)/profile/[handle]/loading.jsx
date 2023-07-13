import "./profile.css"

const ProfileLoading = ()=>{
    return(
        <div className="w-full h-48">
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


export default ProfileLoading;