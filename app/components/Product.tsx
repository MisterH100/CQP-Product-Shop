'use client'
import { Carousel } from './Carousel';
import { IProducts } from '../interfaces/ProductInterface';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';
import { randsSA } from '../functions/formatToRands';
import { Button } from './Button';



export const Product  = ({product}:{product:IProducts})=>{
    const [itemQuantity, setItemQuantity] = useState(1)
    const {addToCart} = useCartContext()

    return(
        <>
            {product._id !== 0?
            <div className="min-w-fit w-full md:w-2/4 md:h-[500px] md:mx-auto flex flex-col bg-white rounded-lg shadow md:flex-row">
                <div className="w-full md:w-3/6 min-w-[200px] h-3/4 md:h-full">
                    <Carousel
                        image_one={product.productImages.image_one.image_url}
                        image_two={product.productImages.image_two.image_url}
                        image_three={product.productImages.image_three.image_url}
                    />
                </div>

                <div className="min-w-[300px] w-full md:w-2/4 p-4">
                    <div className="flex text-black justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-black">{product.name}</h2>
                            <h4 className='text-base font-medium tracking-tight text-black'>{product.brand}</h4>
                        </div>
                        <div>
                            <span className="flex">
                                <svg className="w-6 h-6 text-blck" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M11 5.1a1 1 0 0 1 2 0l1.7 4c.1.4.4.6.8.6l4.5.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3 1l1 4a1 1 0 0 1-1.5 1.2l-3.9-2.3a1 1 0 0 0-1 0l-4 2.3a1 1 0 0 1-1.4-1.1l1-4.1c.1-.4 0-.8-.3-1l-3.3-2.8a1 1 0 0 1 .5-1.7l4.5-.4c.4 0 .7-.2.8-.6l1.8-4Z"/>
                                </svg>
                                99%
                            </span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <h3 className="text-2xl font-bold text-black">{randsSA.format(product.price)}</h3>
                        <p className="my-4 font-normal text-black text-[15px] leading-[15px]">{product.description}</p>
                    </div>

                    <div className="w-full flex justify-between items-center py-2">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <div className="max-w-[120px] inline-flex" role="group ">
                                <Button
                                    type="borderd"
                                    size="px-4"
                                    click={()=> setItemQuantity(itemQuantity - 1)}
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 text-black border-t-2 border-b-2 border-black">
                                    {itemQuantity}
                                </span>

                                <Button
                                    type="borderd"
                                    size="px-4"
                                    click={()=> setItemQuantity(itemQuantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <Button
                            type="primary"
                            size="h-12 px-3"
                            click={()=>addToCart(product._id, itemQuantity)}
                            >
                            add to cart
                        </Button>
                    </div>

                </div>


            </div>: null
            }
        </>
    )
}