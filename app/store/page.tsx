'use client'
import { useEffect, useState,useMemo } from "react"
import { Products } from "../components/Products"
import { IProducts } from "../interfaces/ProductInterface"
import { ProductsLoadingSkeleton } from "../components/ProductsLoadingSkeleton"
import { fetchData } from "../functions/fetchData"

const ProductsPage =() =>{
    const [products, setProducts] = useState<IProducts[]>([{}] as IProducts[]);
    const [loading, setLoading] = useState(false);
    const URL = 'https://misterh-api-server.onrender.com/api/products'

    useEffect(()=>{
        fetchData(URL,setProducts,setLoading);
    },[URL]);
    
    const cachedProductsData = useMemo(()=> products, [products])
    return(
        <section className="w-full pt-20 min-h-screen dark:bg-gray-900">
            {loading? 
            <ProductsLoadingSkeleton/>:
            <Products products={cachedProductsData}/>
            }    
        </section>
    )
}

export default ProductsPage