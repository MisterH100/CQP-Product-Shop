import Link from "next/link"
import { Button } from "./Button"
import { DropDown } from "./Dropdown"



export const Drawer =({active,setActive}:{active:boolean,setActive:React.Dispatch<React.SetStateAction<boolean>>})=>{
    return(
        <div 
            className={`${active?"translate-x-0":"translate-x-[1000px]"} block md:hidden absolute w-full min-h-screen top-0 right-0 z-[999] bg-white transition-all duration-100 ease-in-out`}>
            <div className="w-full p-4">
                <Button 
                    type="borderd" 
                    size="h-10 px-4 text-black bg-white" 
                    click={()=>setActive(false)}
                    >
                    Close X
                </Button>
            </div>
            <div className="bg-white w-full p-4">
                <DropDown/>
                <div className="flex flex-col mt-4">
                    <Link 
                        href="/"
                        className="text-black text-[15px] font-bold px-2 py-4 leading-[15px] hover:text-white hover:bg-black"
                        >
                        Women
                    </Link>
                    <Link 
                        href="/"
                        className="text-black text-[15px] font-bold px-2 py-4 leading-[15px] hover:text-white hover:bg-black"
                        >
                        Men
                    </Link>
                </div>
            </div>
        </div>
    )
}