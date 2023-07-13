import { Loading  } from "@/components/loading"

export const TableLoading = ({len})=>{
    const array = new Array(len).fill(0);

    console.log(array, len)

    return(
        <div className="w-4/5 m-5 h-48 bg-white rounded-lg">
            <Loading></Loading>
        </div>
    )
}

