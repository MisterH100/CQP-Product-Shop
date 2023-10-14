'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IProducts } from "../interfaces/ProductInterface"
import { useCartContext } from "../context/CartContext";


type FormData ={
    email: string
    name: string,
    lastName: string,
    phone: number,
    products: IProducts[]
}

export const ConatctForm = ({cartList,setOpenSubmitForm}:{cartList: IProducts[], setOpenSubmitForm: Dispatch<SetStateAction<boolean>>})=>{
    const [formData, setFormData] = useState({} as FormData);
    const [loading, setLoading] = useState(false)
    const {setCartList} = useCartContext();


    const HandleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, products: cartList
        })
    }
    const POSTURL = "https://misterh-api-server.onrender.com/api/products/orders"
    const postData = async (url: string) =>{
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            lastName: formData.lastName,
            phone: formData.phone,
            products: formData.products
          }),
        });  
        return response.json();
    }

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(formData.email == null && formData.name == null){
            return
        }
        try {
            setLoading(true)
            postData(POSTURL)
            .then((data) => {
                console.log(data); 
                setLoading(false)
                setCartList([])
                setOpenSubmitForm(false)
            });
        } catch (error) {
            console.log(error)
            setOpenSubmitForm(true)
        }
        


    }


    return(
        <form className="relative w-full md:w-[50%] h-fit rounded-l bg-white dark:bg-gray-900 p-10">
            <button type="button"
                className="absolute top-0 right-0 text-gray-400 bg-transparent text-sm w-8 h-8 flex justify-center items-center " 
                onClick={()=>setOpenSubmitForm(false)}
                >
                    <svg 
                        className="w-3 h-3" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 14">
                        <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
            </button>
            <div className="relative z-0 w-full mb-6 group">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    onChange={HandleChange}
                />
                <label 
                    htmlFor="email" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        required 
                        onChange={HandleChange}    
                    />
                    <label 
                        htmlFor="name" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        required 
                        onChange={HandleChange}
                    />
                    <label 
                        htmlFor="lastName" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name
                    </label>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="tel" 
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        name="phone" 
                        id="phone" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                        required 
                        onChange={HandleChange}
                    />
                    <label 
                        htmlFor="phone" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)
                    </label>
                </div>
            </div>
            <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={HandleSubmit}
                >{loading?"Sending": "Submit"}
            </button>
    </form>
    )
}