import { ICategory } from "../interfaces/CategoryInterface"


export const Categories =({catNames}:{catNames:ICategory[]})=>{
    return(
        <>
            {catNames.map((catname,index)=>
        
                <div key={index}
                    className="w-[350px] h-[450px] bg-black flex items-end">
                    <h3 className="w-full text-center text-white text-4xl font-bold leading-9 mb-10">
                        {catname.cat}
                    </h3>
                </div>
            )}
        </>
    )
}