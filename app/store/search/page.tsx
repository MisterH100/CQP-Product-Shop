'use client'
import { useSearchParams } from 'next/navigation'
import { IProducts } from '@/app/interfaces/ProductInterface';
import { useEffect, useState } from 'react';
import { fetchData } from '@/app/functions/fetchData';
import { Products } from '@/app/components/Products';
import { ProductsLoadingSkeleton } from '@/app/components/ProductsLoadingSkeleton';
import Link from 'next/link';


const SearchPage =() =>{
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState<IProducts[]>([{
        _id: 0,
        name: "",
        brand: "",
        description: "",
        price: 0,
        quantity: 0,
        category: [""],
        gender: "",
        type: "",
        footsize: [],
        clothingsize: [],
        productImages: {
            image_one: {
                data: "",
                image_url: "",
                contentType: ""
            },
            image_two: {
                data: "",
                image_url: "",
                contentType: ""
            },
            image_three: {
                data: "",
                image_url: "",
                contentType: ""
            },
        },
        createdAt: new Date(),
    }]);
    const [loading, setLoading] = useState(false);
    const URL = `https://misterh-api-server.onrender.com/api/products/search/${search}`

    useEffect(()=>{
        fetchData(URL,setProducts,setLoading);
    },[URL]);
    
    return(
        <section className="relative w-full pt-20">
            <div className="absolute w-full px-2 md:px-10 top-20 left-0">
                <Link href={'/store'} className="flex gap-1 items-center">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Back
                </Link>
            </div>
            {
                loading?null:<h1 className="w-full text-center text-2xl text-white py-8">{products.length} Results for : {search}</h1>
            }
            {
                loading? <ProductsLoadingSkeleton/>:
                <Products products={products}/>
            }
        </section>
    )
}

export default SearchPage