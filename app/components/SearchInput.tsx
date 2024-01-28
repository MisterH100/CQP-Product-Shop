'use client'
import { useState } from "react";

export const SearchInput =()=>{
    const [query, setQuery] = useState("")
    const [active,setActive] = useState(false);

    return(
        <form className="w-200px flex items-center" action={`/store/search/${query}`}>   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full flex">
                <input 
                    type="text" 
                    value={query}
                    className="hidden md:block w-[300px] h-[40px] pl-2 text-black border border-black border-r-white"
                    placeholder="Search brand name..." 
                    required
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={()=>setActive(!active)}
                    className="w-[50px] h-[40px] text-sm font-medium text-black flex justify-center items-center border border-white md:border-black border-l-white">
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>

            {active?
                <div className="absolute left-0 top-0 z-[100] w-full h-full md:hidden bg-white flex justify-center items-center">
                    <div className="flex border border-black">
                        <input 
                            type="text" 
                            value={query}
                            className="w-[300px] h-[40px] pl-2 text-black"
                            placeholder="Search brand name..." 
                            required
                            onChange={(e)=>setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={()=>setActive(!active)}
                            className="w-[50px] h-[40px] text-sm font-medium text-black flex justify-center items-center">
                            <svg className="w-6 h-6"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>:null
            }
            
        </form>
    )
}