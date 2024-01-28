'use client'
import { Button } from "@/app/components/Button"
import { Cart } from "@/app/components/Cart"
import { useCartContext } from "@/app/context/CartContext"
import { randsSA } from "@/app/functions/formatToRands"
import { useRouter } from "next/navigation"


const CartPage = () =>{
    const router = useRouter();
    const {setCartList,cartList} = useCartContext();
    const total = cartList.map((product) => {return product.price * product.quantity }).reduce((prev, curr) => prev + curr, 0);

    return(
        <section className="relative w-full min-h-screen pt-40 bg-white flex flex-wrap px-4">
            <div className="w-full md:w-1/2 pr-4">
                <h1 className="text-black text-2xl font-bold">Shopping Cart</h1>
                <Cart cartList={cartList}/>
                <div>
                    {cartList.length > 0?
                        <span className="my-8 text-2xl font-bold text-black">Total: {randsSA.format(total)}
                        </span>:
                        <span className="my-8 text-sm font-medium text-black">Your cart is empty, Start shopping and add items to your cart
                        </span>
                    }
                </div>
                <div className="w-full flex gap-10 pt-4">
                    <Button
                        type="primary"
                        size="fit p-2"
                        click={()=>router.push("/store")}
                        >
                        Continue shopping
                    </Button>
                    <Button 
                        type="borderd" 
                        size={`${cartList.length > 0? "block":"hidden"} w-fit p-2`}
                        click={()=> setCartList([])}
                        >
                            Discard Cart
                    </Button>
                </div>
            </div>

            <div className="w-full md:w-1/2 min-h-screen bg-zinc-300 mt-8 md:mt-0">
                <h1 className="text-black text-2xl font-bold px-4">Summary</h1>
                <div className="w-full flex py-8 border-b-2 border-black px-4">
                    <ul className="w-1/2">
                        <li className="w-full text-black text-xl font-medium leading-tight">Items:</li>
                        <li className="w-full text-black text-xl font-medium leading-tight pt-8">Total:</li>
                    </ul>
                    <ul className="w-1/2 text-right">
                        <li className="w-full text-black text-xl font-medium leading-tight">{cartList.length}</li>
                        <li className="w-full text-black text-xl font-medium leading-tight pt-8">R{total}</li>
                    </ul>
                </div>
                
                <div className="flex flex-col text-black justify-center px-4 py-4">
                    <label
                        className="flex items-center flex-wrap" 
                        htmlFor="shipping">
                        <span className="w-[100px]">Shipping</span>
                        <input
                            className="w-4 h-4 checked:bg-black border border-black rounded-full peer" 
                            type="radio" 
                            name="method" 
                            checked
                            id="shipping"
                        />
                        <div className="flex items-center w-full h-[50px] my-4 p-2 bg-white text-black text-opacity-50 text-lg font-medium leading-tight peer-checked:text-opacity-100">
                            <p className="w-full truncate">address:<br/>adress adress adress adrtess adress adress</p>
                            <div>
                                <Button 
                                    type="borderless"
                                    size="p-2"
                                    click={()=>console.log("hi")}
                                    >
                                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </label>

                    <label
                        className="flex items-center flex-wrap " 
                        htmlFor="collection">
                        <span className="w-[100px]">Collection</span>
                        <input
                            className="w-4 h-4 checked:bg-black border border-black rounded-full peer" 
                            type="radio" 
                            name="method" 
                            id="collection"
                        />
                        <div className="flex items-center w-full h-[50px] my-4 p-2 bg-white text-black text-opacity-50 text-lg font-medium leading-tight peer-checked:text-opacity-100">
                            <p className="w-full truncate">address:<br/>adress adress adress adress adrtess adress adress</p>
                        </div>
                    </label>
                    {!cartList&&
                        <div className="w-full flex justify-center my-8">
                            <Button
                                type="primary"
                                size="w-full md:w-[300px] h-[50px]"
                                click={()=>console.log("hi")}
                                >
                                Checkout
                            </Button>
                        </div>
                    }
                </div>
                <div className="w-full flex justify-center pt-20">
                    {cartList.length > 0 &&
                        <Button 
                            type="primary" 
                            size="w-[301px] h-[50px] p-2"
                            click={()=> console.log("hi")}
                            >
                                Checkout
                        </Button>
                    }
                </div>
            </div>
        </section>
    )
}

export default CartPage