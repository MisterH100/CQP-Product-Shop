'use client'
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { useCartContext } from "../context/CartContext"


export const Header =()=>{
    const {cartList} = useCartContext()
    return(
        <header>
            <nav className="fixed w-full z-20 top-0 left-0 bg-white border-gray-200 dark:bg-gray-900 border-b dark:border-gray-600">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link href="/store" className="flex items-center mr-2">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CQP</span>
                    </Link>
                    <SearchInput/>
        
                    <Link href={'/store/cart'}className=" relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        {cartList.length > 0?
                            <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{cartList.length}</span>: 
                            null
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}