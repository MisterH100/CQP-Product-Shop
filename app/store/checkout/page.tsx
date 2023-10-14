'use client'
import { ConatctForm } from "@/app/components/ContactForm";
import { Table } from "@/app/components/Table";
import { useCartContext } from "@/app/context/CartContext"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const CheckoutPage =() =>{
    const {cartList} = useCartContext();
    const [openSubmitForm, setOpenSubmitForm] = useState(false);
    const route = useRouter();

    useEffect(()=>{
        if(cartList.length < 1){
            route.push('/store/thankyou')
        }
    },[cartList])

    return(
        <section className="relative w-full min-h-screen pt-20 md:px-10 dark:bg-gray-900">
            <div className="absolute w-full px-2 md:px-10 top-20 left-0">
                <Link 
                    href={'/store/cart'} 
                    className="flex gap-1 items-center">
                    <svg 
                        className="w-4 h-4 text-gray-800 dark:text-white" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 10">
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Back
                </Link>
            </div>
            <div className="pt-10">
                <p className="text-sm text-black dark:text-white"> <span className="text-red-500">*Note: </span>
                    The following list of products shown in the table bellow will be sent to the seller whom you will get in contact with you to finalise the purchase, click on *proceed to fill in the required form and submit your order.
                </p>
            </div>
            <Table cartList={cartList}/>
            {openSubmitForm?
                <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50">
                    <ConatctForm cartList={cartList} setOpenSubmitForm={setOpenSubmitForm}/>
                </div>: null
            }
            <div className="w-full flex justify-center pt-10">
                { cartList.length > 0?
                    <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={()=>setOpenSubmitForm(true)}
                    >Proceed
                    </button>: null
                }
            </div>
        </section>
    )
}

export default CheckoutPage