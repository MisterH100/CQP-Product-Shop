import Link from "next/link";
import { useState } from "react"


export const DropDown =()=>{
    const [active,setActive] = useState(false);
    return(
        <>       
            <button 
                onClick={()=>setActive(!active)}
                className="text-black text-[15px] font-medium leading-[15px] flex items-center">
                Categories
                <svg className={`w-2.5 h-2.5 ms-3 transition-all duration-100 ease-in-out ${active&& "-rotate-180 transition-all duration-100 ease-in-out"}`} 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {active&&
                <div className="absolute z-10 divide-y rounded-lg shadow w-44 bg-zinc-300">
                    <ul className="py-2 text-sm text-black" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-black hover:text-white">Shoes</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-black hover:text-white">Women</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-black hover:text-white">Men</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-black hover:text-white">Sports</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-black hover:text-white">Clothing</Link>
                    </li>
                    </ul>
                </div>
            }
        </>
    )

}