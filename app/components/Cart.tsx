'use client'
import Image from 'next/image'
import { useCartContext } from '../context/CartContext'
import { randsSA } from '../functions/formatToRands'
import Link from 'next/link'
import { IProducts } from '../interfaces/ProductInterface'
import { Button } from './Button'


export const Cart = ({cartList}:{cartList:IProducts[]}) =>{
    const {removeFromCart,increaseCartQuantity,decreaseCartQuantity} = useCartContext()
    const total = cartList.map((product) => {return product.price * product.quantity }).reduce((prev, curr) => prev + curr, 0)


    return( 
        <>
            <ul className="w-full py-10 divide-y divide-black">
                {cartList.map(item =>
                    <li key={item._id} className="flex items-center gap-4 py-4">
                        <div className="min-w-[80px] min-h-[80px]">
                            <Image 
                                className="min-w-full min-h-full object-cover" 
                                src={item.productImages.image_one.image_url}
                                alt={item.name}
                                width={100}
                                height={100}
                                >
                            </Image>
                        </div>
                        <div className="flex gap-4 flex-col md:flex-row md:items-center">
                            <div className="w-[150px] truncate">
                                <p className="text-sm font-medium text-black truncate">
                                {item.name}
                                </p>
                                <p className="text-sm font-medium text-black">{item.brand}</p>
                            </div>

                            <div className="max-w-[120px] inline-flex" role="group">
                                <Button
                                    type="borderd"
                                    size="px-4"
                                    click={()=> decreaseCartQuantity(item._id)}
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 text-black border-t-2 border-b-2 border-black">
                                    {item.quantity}
                                </span>

                                <Button
                                    type="borderd"
                                    size="px-4"
                                    click={()=> increaseCartQuantity(item._id)}
                                >
                                    +
                                </Button>
                            </div>

                            <div className="ml-2 text-base text-black">
                                <p className="min-w-min text-sm font-medium text-black">{randsSA.format(item.price * item.quantity)}</p>

                                <p className="min-w-fit text-sm text-black">
                                x{item.quantity}
                                </p>
                            </div>
                        </div>
                        <Button 
                            type="primary"
                            size="p-2 bg-red-700 hover:bg-red-800"
                            click={()=>removeFromCart(item._id)}
                            >
                                Remove
                        </Button>
                    </li>
                )}
            </ul>
            {/*
            <div className="pt-4">
                <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={()=> setCartList([])}
                >
                <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g>
                </svg>
                    Discard cart
                </button>
                <Link 
                    href={cartList.length > 0?`/store/checkout`: `/store/cart`}
                    className={`${cartList.length > 0? " bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300": "bg-gray-600"} text-white font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center `}

                >
                    Checkout
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                </Link>
            </div>*/}
        </>
    ) 
        
}

