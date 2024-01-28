'use client'
import { HeadingPanel } from "@/app/components/HeadingPanel"
import { Product } from "@/app/components/Product"
import { ProductLoadingSkeleton } from "@/app/components/ProductLoadingSkeleton"
import { Products } from "@/app/components/Products"
import { ProductsLoadingSkeleton } from "@/app/components/ProductsLoadingSkeleton"
import { fetchData } from "@/app/functions/fetchData"
import { IProducts} from "@/app/interfaces/ProductInterface"
import Link from "next/link"
import {useEffect, useState,useMemo, useRef } from "react"


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

    return(
        <section className="relative w-full pt-20">
            <div className="w-full py-10 md:h-[600px] bg-[url('/jumbotron-ps.png')] dark:bg-[url('/jumbotron-dark-ps.png')] bg-cover bg-center bg-no-repeat">
                {loading?
                    <ProductLoadingSkeleton/>:
                    <Product product={cachedProductData}/>
                }
            </div>
            <div className="bg-white">
                <div className="p-4 mt-4 text-white">
                    <HeadingPanel>
                        Featured products
                    </HeadingPanel>
                </div>
                {loading?  
                    <ProductsLoadingSkeleton/>:
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 ">
                        <Products products={products}/>
                    </div>
                }  
            </div>
        </section>
    )
}

export default ProductPage