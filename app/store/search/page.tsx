'use client'
import { useSearchParams } from 'next/navigation'
import { IProducts } from '@/app/interfaces/ProductInterface';
import { useEffect, useState } from 'react';
import { fetchData } from '@/app/functions/fetchData';
import { Products } from '@/app/components/Products';
import { ProductsLoadingSkeleton } from '@/app/components/ProductsLoadingSkeleton';


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
        <section className="w-full pt-20">
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