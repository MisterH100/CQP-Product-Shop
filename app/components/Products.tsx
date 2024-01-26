import Image from 'next/image'
import Link from 'next/link';
import { IProducts } from '../interfaces/ProductInterface';
import { randsSA } from '../functions/formatToRands';
import { useCartContext } from '../context/CartContext';
import { Button } from './Button';


export const Products = ({products}: {products: IProducts[]}) =>{
   const {addToCart} = useCartContext()

    return(
        <>
            {
                products.map((product) =>
                <article key={product._id} className="w-[150px] md:w-[250px] pb-4">
                    <div className="w-full h-[220px] md:h-[350px] overflow-hidden">
                        <Link  href={`/store/product/${product._id}`}> 
                            <Image className="w-full h-full object-cover hover:scale-105 transition-all ease-in"
                                src={product.productImages?.image_one.image_url} 
                                alt={product.name} 
                                width={300}
                                height={350}
                            />
                        </Link>
                    </div>
                    <div className="w-full flex text-black md:px-2">
                        <div className="w-1/2">
                            <Link href={`/store/product/${product._id}`} className="w-full">
                                <h2 className="text-base font-medium tracking-tight text-black truncate text-ellipsis">{product.name}</h2>
                            </Link>
                            <h3 className="text-sm md:text-lg font-bold text-black mt-4">{randsSA.format(product.price)}</h3>
                        </div>

                        <div className="w-1/2 flex flex-col items-end">
                            <span className="flex">
                                <svg className="w-6 h-6 text-blck" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M11 5.1a1 1 0 0 1 2 0l1.7 4c.1.4.4.6.8.6l4.5.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3 1l1 4a1 1 0 0 1-1.5 1.2l-3.9-2.3a1 1 0 0 0-1 0l-4 2.3a1 1 0 0 1-1.4-1.1l1-4.1c.1-.4 0-.8-.3-1l-3.3-2.8a1 1 0 0 1 .5-1.7l4.5-.4c.4 0 .7-.2.8-.6l1.8-4Z"/>
                                </svg>
                                99%
                            </span>
                            <div className="mt-2 md:mt-4">
                                <Button 
                                    type="borderd" 
                                    size="w-[50px] h-[30px] flex items-center justify-center"
                                    click={()=>addToCart(product._id, product.quantity)}
                                    >
                                    <span>+</span>
                                    <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z"/>
                                    </svg>
                                </Button>
                            </div>

                        </div>
                    </div>
                </article>
            )
            }
        </>
    )
}     
