

export const HeadingPanel =({children}:{children:React.ReactNode})=>{
    return(
        <div className="w-full">
            <h1 className="w-full text-black text-base md:text-2xl font-bold leading-9 flex justify-between">{children}</h1>
        </div>
    )
}