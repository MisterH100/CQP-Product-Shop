import { url } from "inspector"
import { ICategory } from "../interfaces/CategoryInterface"


export const Categories =({catNames}:{catNames:ICategory[]})=>{
    return(
        <>
            {catNames.map((catname,index)=>
        
                <div 
                    key={index}
                    style={{
                        backgroundImage: "url("+`${catname.path}`+")"
                    }}
                    className="w-[350px] h-[450px] bg-black bg-center bg-cover bg-no-repeat  bg-co flex items-end">
                    <h3 className="w-full text-center text-white text-4xl font-bold leading-9 mb-10 drop-shadow-xl shadow-black">
                        {catname.cat}
                    </h3>
                </div>
            )}
        </>
    )
}