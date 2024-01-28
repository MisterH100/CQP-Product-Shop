'use client'
import { IProducts } from '@/app/interfaces/ProductInterface';
import { useEffect, useState } from 'react';
import { fetchData } from '@/app/functions/fetchData';
import { Products } from '@/app/components/Products';
import { ProductsLoadingSkeleton } from '@/app/components/ProductsLoadingSkeleton';
import { Button } from '@/app/components/Button';
import { useRouter } from "next/navigation";

const ResultsPage =({params:{query}}: {params:{query: string}})=>{
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([{}] as IProducts[]);
    const [loading, setLoading] = useState(false);
    const URL = `https://misterh-api-server.onrender.com/api/products/search/${query}`

    useEffect(()=>{
        fetchData(URL,setProducts,setLoading);
    },[URL]);

    return(
        <section className="relative w-full min-h-screen pt-20 bg-white">
            <div className="fixed w-full h-fit my-4 z-50 flex justify-center">
                <div className="w-fit flex justify-center gap-4 rounded-full border border-black bg-white">
                    <Button 
                        type="primary" 
                        size="w-fit p-4 rounded-full"
                        click={()=>router.push("/store")}
                        >
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                        </svg>
                    </Button>
                    <h1 className="w-fit text-center text-black font-medium text-sm tracking-normal bg-white rounded-full p-4">"{query}" in Search</h1>
                </div>
            </div>
            {loading? 
            <ProductsLoadingSkeleton/>:
            <div className="w-full h-fit grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 px-4">
                <Products products={products}/>
            </div>
            }  
        </section>
    )
}

export default ResultsPage;