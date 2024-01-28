import Link from "next/link"
import { Button } from "./Button"
import { useState } from "react"



export const Drawer =({active,setActive}:{active:boolean,setActive:React.Dispatch<React.SetStateAction<boolean>>})=>{
    const [hidden, setHidden] = useState(true);

    return(
        <div 
            className={`${active?"translate-x-0":"translate-x-[1000px]"} block md:hidden absolute w-full min-h-screen top-0 right-0 z-[999] bg-white transition-all duration-100 ease-in-out`}>
            <div className="w-full p-4 flex justify-between">
                <Link 
                    href="/store" 
                    className="flex items-center mr-2">
                    <span className="self-center whitespace-nowrap text-black text-base md:text-xl font-bold leading-[48px]">Product Store.</span>
                </Link>
                <Button 
                    type="borderd" 
                    size="h-10 px-4 text-black bg-white" 
                    click={()=>setActive(false)}
                    >
                    Close X
                </Button>
            </div>
            <div className="w-full p-4">
                <ul>
                    <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black flex">
                        <Link 
                            href={'/store/cart'}
                            className="flex items-center gap-2">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"/>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black flex">
                        <Link 
                            href={'/store/cart'}
                            className="flex items-center gap-2">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z"/>
                            </svg>
                            Cart
                        </Link>
                    </li>
                    <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black flex">
                        <Link 
                            href={'/store/cart'}
                            className="flex items-center gap-2">
                           <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            Account
                        </Link>
                    </li>
                </ul>

                <div className="w-full flex flex-col mt-4">
                    <Button 
                        type="borderd" 
                        size="p-4 w-full h-fit text-black text-[15px] font-bold leading-[15px] flex w-full justify-between"
                        click={()=>setHidden(!hidden)}>
                        Categories
                        <span className="text-black text-[15px] font-bold leading-[15px] transition-all duration-150 ease-in-out">{hidden? "+" : "-" }</span>
                    </Button>
                    <ul className={` ${hidden?"h-0 overflow-hidden": "h-fit py-4"} bg-zinc-300 transition-all duration-150 ease-in-out`}>
                        <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black">
                            <Link 
                                href="/"
                                >
                                Women
                            </Link>
                        </li>
                        <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black">
                            <Link 
                                href="/"
                                >
                                Men
                            </Link>
                        </li>
                        <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black">
                            <Link 
                                href="/"
                                >
                                Shoes
                            </Link>
                        </li>
                        <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black">
                            <Link 
                                href="/"
                                >
                                Sports
                            </Link>
                        </li>
                        <li className="text-black text-[15px] font-bold leading-[15px] p-4 hover:text-white hover:bg-black">
                            <Link 
                                href="/"
                                >
                                Clothing
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}