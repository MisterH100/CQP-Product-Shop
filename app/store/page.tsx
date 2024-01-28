'use client'
import { useEffect, useState,useMemo, useRef } from "react"
import { Products } from "../components/Products"
import { IProducts } from "../interfaces/ProductInterface"
import { ProductsLoadingSkeleton } from "../components/ProductsLoadingSkeleton"
import { fetchData } from "../functions/fetchData"
import { Banner } from "../components/Banner"
import { HeadingPanel } from "../components/HeadingPanel"
import { Button } from "../components/Button"
import { Categories } from "../components/Categories"
import { useRouter } from "next/navigation"

const ProductsPage =() =>{
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([{}] as IProducts[]);
    const [loading, setLoading] = useState(false);
    const URL = 'https://misterh-api-server.onrender.com/api/products'
    const [catNames, setCatnames] = useState([
        {id:1,cat:"shoes",path:"/shoes.jpg"},
        {id:2,cat:"women",path:"/women.jpg"},
        {id:3,cat:"men",path:"/men.jpg"},
        {id:4,cat:"sports",path:"/sports.jpg"},
        {id:5,cat:"clothing",path:"/clothing.jpg"}
    ])

    useEffect(()=>{
        fetchData(URL,setProducts,setLoading);
    },[URL])

    const productsCarouselRef = useRef<HTMLDivElement>(null);
    const catCarouselRef = useRef<HTMLDivElement>(null);
    const [currPos,setCurrPos] = useState(0);
    const productsMaxPos = productsCarouselRef.current? productsCarouselRef.current.getBoundingClientRect().width - window.innerWidth: 150; 
    const catMaxPos = catCarouselRef.current? catCarouselRef.current.getBoundingClientRect().width - window.innerWidth: 300;

    const moveRight =(ref:any,num:number,position:number)=>{
        if(currPos < position){
            setCurrPos((prev)=>prev+num);
        }
        if(currPos == position || currPos > position){
            setCurrPos(0);
        }

        if(ref.current){
            ref.current.style.translate = `-${currPos}px`;
        }
    }


    const cachedProductsData = useMemo(()=> products, [products])
    return(
        <section className="w-full pt-20 min-h-screen bg-white">
            <Banner/>
            <div className="p-4 mt-4">
                <HeadingPanel>
                    Featured products
                    <div className="hidden md:flex gap-4 items-center">
                        <button 
                            onClick={()=>moveRight(productsCarouselRef,300,productsMaxPos)}
                            className="text-black">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </HeadingPanel>
            </div>
            {loading? 
            <ProductsLoadingSkeleton/>:
                <div className="w-full h-[600px] md:h-fit overflow-y-auto md:overflow-x-auto ">
                    <div
                        ref={productsCarouselRef} 
                        className="w-full md:w-max h-full grid grid-cols-2 justify-items-center md:flex gap-4 px-4 transition-all duration-100 ease-in-out cursor-grab">
                        <Products products={cachedProductsData}/>
                    </div>
                </div>
            }  
            <div className="w-full h-fit flex justify-center p-4 mt-4">
                <Button 
                    type="primary" 
                    size="w-40 h-10"
                    click={()=>router.push("/store/products")}
                    >
                   View all products
                </Button>
            </div>
            <div className="p-4 mt-4">
                <HeadingPanel>
                    Categories
                    <div className="hidden md:flex gap-4 items-center">
                        <button 
                            onClick={()=>moveRight(catCarouselRef,400,catMaxPos)}
                            className="text-black">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </HeadingPanel>
            </div>
            <div className="w-full h-fit overflow-hidden">
                <div
                    ref={catCarouselRef}
                    className="w-full md:w-max h-full flex flex-col items-center md:flex-row  gap-4 px-4">
                    <Categories catNames={catNames}/>
                </div>
            </div>
            <div className="w-full h-fit flex justify-center p-4 mt-4">
                <Button 
                    type="primary" 
                    size="w-40 h-10"
                    click={()=>router.push("/")}
                    >
                   View all categories
                </Button>
            </div>
        </section>
    )
}

export default ProductsPage