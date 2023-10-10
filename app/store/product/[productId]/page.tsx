'use client'
import { Product } from "@/app/components/Product"
import { ProductLoadingSkeleton } from "@/app/components/ProductLoadingSkeleton"
import { Products } from "@/app/components/Products"
import { fetchData } from "@/app/functions/fetchData"
import { IProducts} from "@/app/interfaces/ProductInterface"
import Link from "next/link"
import {useEffect, useState,useMemo } from "react"


const ProductPage = ({params: {productId}}: {params: {productId:string}}) =>{
    const [product, setProduct] = useState<IProducts>({
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
    });
    const [products, setProducts] = useState<IProducts[]>([{}] as IProducts[]);
    const [loading, setLoading] = useState(false);
    const URL = `https://misterh-api-server.onrender.com/api/products/product/${productId}`;
    const FEATURED_URL = 'https://misterh-api-server.onrender.com/api/products';

    useEffect(()=>{
        fetchData(URL,setProduct,setLoading);
        fetchData(FEATURED_URL, setProducts,setLoading)
    },[URL]);
    const cachedProductData = useMemo(()=> product, [product])
    const cachedProductsData = useMemo(()=> products, [products])
    return(
        <section className="relative w-full pt-8">
            <div className="absolute w-full px-2 md:px-10 top-20 left-0">
                <Link href={'/store'} className="flex gap-1 items-center">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Back
                </Link>
            </div>
            {loading?
            <ProductLoadingSkeleton/>:
            <Product product={cachedProductData}/>
            }
            <div>
                <Products products={cachedProductsData}/>
            </div>
        </section>
    )
}

export default ProductPage