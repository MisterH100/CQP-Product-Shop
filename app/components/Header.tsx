'use client'
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { useCartContext } from "../context/CartContext"
import { DropDown } from "./Dropdown"


export const Header =()=>{
    const {cartList} = useCartContext();
    return(
        <header className="fixed bg-white w-full h-fit p-4 z-20 top-0 left-0">
            <nav className="w-full h-full">
                <div className="flex items-center">
                    <Link 
                        href="/store" 
                        className="flex items-center mr-2">
                        <span className="self-center whitespace-nowrap text-black text-base md:text-xl font-bold leading-[48px]">Product Store.</span>
                    </Link>
                    <div className="ml-10 hidden md:flex gap-4 w-full">  
                        <div className="relative z-50">
                            <DropDown/>
                        </div>         
                        <div className="flex gap-4">
                            <Link 
                                href="/"
                                className="text-black text-[15px] font-medium leading-[15px]"
                                >
                                Women
                            </Link>
                            <Link 
                                href="/"
                                className="text-black text-[15px] font-medium leading-[15px]"
                                >
                                Men
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <SearchInput/>
                        <Link 
                            href={'/store/cart'}
                            className="relative p-2 md:ml-4 rounded-lg w-[50px] h-[40px]">
                            <svg className="w-6 h-6 text-black mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z"/>
                            
                            </svg>
                            {cartList.length > 0?
                                <div className="relative z-50 -left-[4px] top-[14px] text-white text-center w-10 h-6 rounded-lg bg-blue-800">
                                    <svg className="absolute mx-auto -top-[14px] left-2 w-6 h-6 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M5.6 13.7A2 2 0 0 0 7 17h10a2 2 0 0 0 1.5-3.3l-4.9-5.9a2 2 0 0 0-3 0l-5 6Z" clipRule="evenodd"/>
                                    </svg>
  
                                {cartList.length}
                                </div>:null     
                            }
                        </Link>
                    </div>
                    <div className="block md:hidden p-2 md:ml-4 w-[50px] h-[40px]">
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                    </svg>
                    </div>
                </div>
            </nav>
        </header>
    )
}