
'use client'
import { Products } from "@/app/components/Products";
import { ProductsLoadingSkeleton } from "@/app/components/ProductsLoadingSkeleton";
import { fetchData } from "@/app/functions/fetchData";
import { IProducts } from "@/app/interfaces/ProductInterface";
import { useEffect, useState } from "react";


const ProductsPage = () =>{
    const [products, setProducts] = useState<IProducts[]>([{}] as IProducts[]);
    const [loading, setLoading] = useState(false);
    const URL = 'https://misterh-api-server.onrender.com/api/products';
    useEffect(()=>{
        fetchData(URL,setProducts,setLoading);
    },[URL]);
    const [catNames, setCatnames] = useState([
        {id:1,cat:"all"},
        {id:2,cat:"women"},
        {id:3,cat:"men"},
        {id:4,cat:"shirts"}
    ])

    return(
        <section className="w-full min-h-screen bg-white">
            <div className="w-full pt-32 pb-10 flex gap-4 px-4 placeholder:overflow-hidden">
                {catNames.map((cat,index)=>
                        <label 
                            className="relative h-[50px] p-4 text-center text-white text-[15px] font-bold leading-[15px] group" 
                            key={index}
                            htmlFor={`${cat.cat}`}
                            >
                            <input
                                type="radio"
                                className="absolute w-full h-full top-0 left-0 appearance-none checked:bg-black peer"
                                name="filter"
                                id={`${cat.cat}`}
                                
                            />
                            <span className="text-black relative z-10 peer-checked:text-white">{cat.cat}</span>
                        </label>
                    )}
            </div>
            {loading?  
            <ProductsLoadingSkeleton/>:
                <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 px-4">
                    <Products products={products}/>
                </div>
            }  
        </section>
    )
}

export default ProductsPage