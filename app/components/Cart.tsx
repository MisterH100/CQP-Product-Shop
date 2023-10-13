'use client'
import Image from 'next/image'
import { useCartContext } from '../context/CartContext'
import { randsSA } from '../functions/formatToRands'
import Link from 'next/link'


export const Cart = () =>{
    const {cartList,setCartList,removeFromCart,increaseCartQuantity,decreaseCartQuantity} = useCartContext()
    const total = cartList.map((product) => {return product.price * product.quantity }).reduce((prev, curr) => prev + curr, 0)


    return( 
        <div className="w-full flex flex-col justify-center items-center py-20">
            <div>
                <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={()=> history.back()}
                >Close Cart</button>
            </div>
            <ul className="w-full py-10 divide-y divide-black dark:divide-gray-700">
                {cartList.map(item =>
                    <li key={item._id}
                        className="w-fit p-0 pt-4 md:p-4 mx-auto mb-10 md:mb-4">
                        <div className="flex items-center space-x-1 md:space-x-4 flex-col md:flex-row gap-4 md:gap-0">
                            <div className="flex gap-2 items-center">
                                <Image 
                                    className="min-w-[40px] w-10 h-10 md:w-20 md:h-20 rounded-full object-cover" 
                                    src={item.productImages.image_one.image_url}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    >
                                </Image>
                                <div className="flex flex-col">
                                    <p className="max-w-[100px] text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.name}
                                    </p>
                                    <p className="min-w-fit text-sm text-gray-500 truncate dark:text-gray-400">
                                    {randsSA.format(item.price)}
                                    </p>
                                </div>
                                <div className="ml-2  text-base font-semibold text-gray-900 dark:text-white">
                                    <p className="min-w-min text-sm font-medium text-gray-900 truncate dark:text-white">{randsSA.format(item.price * item.quantity)}</p>

                                    <p className="min-w-fit text-sm text-gray-500 truncate dark:text-gray-400">
                                    x{item.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-[120px] inline-flex rounded-md shadow-sm" role="group">
                                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                onClick={()=> decreaseCartQuantity(item._id)}
                                disabled={item.quantity < 2}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 dark:border-white dark:text-white dark:hover:text-white">
                                    {item.quantity}
                                </span>
                                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                onClick={()=> increaseCartQuantity(item._id)}
                                disabled={item.quantity == 9}
                                >
                                    +
                                </button>
                            </div>

                            <div>
                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={()=>removeFromCart(item._id)}
                                >Remove
                                </button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <div>
                <span className="mt-4 text-2xl font-bold dark:text-white">Total: {randsSA.format(total)}
                </span>
            </div>
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Checkout
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                </Link>
            </div>
        </div>
    ) 
        
}

