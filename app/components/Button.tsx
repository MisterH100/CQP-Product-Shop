type Type = "primary" | "borderd" | "borderless";

export const Button =({type,size,children,click}:{type:Type,size:string,children:React.ReactNode,click:()=>void})=>{

    const returnType =(t:Type)=>{
        if(t == "primary"){
            return "bg-black text-center text-white text-sm md:text-base font-medium leading-tight";
        }
        if(t == "borderd"){
          return "text-center border-2 border-black text-black text-sm md:text-base font-medium leading-tight";   
        }
        if(t == "borderless"){
            return "text-center text-black text-sm md:text-base font-medium leading-tight";   
          }
          
    }

    return(
        <button 
            onClick={click}
            className={`${returnType(type)} ${size}`}>
            {children}
        </button>
    )
}