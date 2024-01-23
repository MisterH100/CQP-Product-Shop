'use client'
import Link from "next/link"
import { useState } from "react"

export const SearchInput =()=>{
    const [query, setQuery] = useState("")
    return(
        <form className="w-200px flex items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <input 
                    type="text" 
                    value={query}
                    className="hidden md:block w-[300px] h-[50px] border-t border-b border-l border-zinc-800 pl-2 text-black scale-75 md:scale-100" 
                    placeholder="Search brand name..." 
                    required
                    onChange={(e)=>setQuery(e.target.value)}
                />
            </div>
            <Link
                href={`/store/search?search=${query}`}
                className="w-[50px] h-[50px] -ml-2 p-2.5 text-sm font-medium text-black border-white md:border md:border-t md:border-b md:border-r md:border-zinc-800">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </Link>
        </form>
    )
}