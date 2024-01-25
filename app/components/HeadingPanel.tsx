

export const HeadingPanel =({children}:{children:React.ReactNode})=>{
    return(
        <div className="w-full flex justify-between">
            <h1 className="text-black text-base md:text-2xl font-bold leading-9">{children}</h1>
            <div className="flex gap-4 items-center">
                <button className="text-black">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
                </svg>
                </button>
                <button className="text-black">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                </svg>
                </button>
            </div>
        </div>
    )
}