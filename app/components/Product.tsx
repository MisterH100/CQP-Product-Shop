'use client'
import { Carousel } from './Carousel';
import { IProducts } from '../interfaces/ProductInterface';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';
import { randsSA } from '../functions/formatToRands';



export const Product  = ({product}:{product:IProducts})=>{
    const [itemQuantity, setItemQuantity] = useState(1)
    const {addToCart} = useCartContext()

    return(
        <div className="pt-10">
            <div className="w-full py-10 md:h-[600px] bg-[url('/jumbotron-ps.png')] dark:bg-[url('/jumbotron-dark-ps.png')] bg-cover bg-center bg-no-repeat">
                {product._id !== 0?
                    <div className="min-w-fit w-full md:w-2/4 md:h-[500px] md:mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800">
                    <div className="w-full md:w-3/6 min-w-[200px] h-3/4 md:h-full">
                        <Carousel
                            image_one={product.productImages.image_one.image_url}
                            image_two={product.productImages.image_two.image_url}
                            image_three={product.productImages.image_three.image_url}
                        />
                    </div>

                    <div className="min-w-[300px] w-full md:w-2/4 flex flex-col justify-between p-4 leading-normal">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h2>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{randsSA.format(product.price)}</h3>
                        <div className="w-full flex justify-between items-center py-2">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                onClick={()=> setItemQuantity(itemQuantity - 1)}
                                disabled={itemQuantity < 2}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 dark:border-white dark:text-white dark:hover:text-white">
                                    {itemQuantity}
                                </span>
                                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                onClick={()=> setItemQuantity(itemQuantity + 1)}
                                disabled={itemQuantity == 9}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                className="h-10 inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={()=>addToCart(product._id, itemQuantity)}
                                >
                                <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                Add to cart
                                
                            </button>
                        </div>
                        <div className="w-full flex items-center flex-col font-normal text-gray-700 dark:text-gray-400">
                            <span>sizes:</span>
                            <ul className="gap-2 flex text-gray-700 dark:text-gray-400 px-5 py-2.5">
                                {product.type === 'footwear'? product.footsize.map(size => 
                                    <li
                                        key={size}
                                        value={size}
                                    >
                                        <input 
                                            type="radio" 
                                            id={`size${size}`} 
                                            name="sizes"
                                            className="peer"
                                        />
                                        <label 
                                            htmlFor={`size${size}`} 
                                            className="text-gray-800 dark:text-white bg-transparent border peer-checked:border-blue-600 hover:text-white hover:bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700">{size}
                                        </label>
                                    </li>)
                                    : product.clothingsize.map(size => 
                                        <li
                                            key={size}
                                            value={size == 's'?"small": size == 'm'? "medium": size == 'l'? "large": 'size xl'}
                                        >
                                        <input 
                                            type="radio" 
                                            id={`size${size}`} 
                                            name="sizes"
                                            className="peer"
                                        />
                                        <label 
                                            htmlFor={`size${size}`} 
                                            className="text-gray-800 dark:text-white bg-transparent border peer-checked:border-blue-600 hover:text-white hover:bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700">{size}
                                        </label>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>


                </div>: null
                }
            </div>



        </div>

    )
}