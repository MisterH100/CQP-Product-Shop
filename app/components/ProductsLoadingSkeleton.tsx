

export const ProductsLoadingSkeleton = () =>{
    const loadingSkeletons = [1,2,3,4]

    return(
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 px-4">
            {loadingSkeletons.map((item,index)=>
                <div 
                    className="w-[300px] h-[350px] bg-black text-black animate-pulse"
                    key={index}>
                    {item}
                </div>
            )}
        </div>

    )
}