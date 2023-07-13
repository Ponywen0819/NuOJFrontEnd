import "./profile.css"

const ProfileLoading = ()=>{
    return(
        <div className="w-full">
            <div className="mx-auto w-fit h-full flex">
                <div className="lds-spinner my-12">
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