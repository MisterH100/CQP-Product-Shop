import Image from 'next/image'
import Link from 'next/link';
import { IProducts } from '../interfaces/ProductInterface';
import { randsSA } from '../functions/formatToRands';
import { useCartContext } from '../context/CartContext';


export const Products = ({products}: {products: IProducts[]}) =>{
   const {addToCart} = useCartContext()

    return(
        <div className="p-0 md:p-10 min-w-[200px]">
            {products.length !== 1? 
                <div className="flex flex-wrap justify-evenly items-center gap-10">
                    {
                    products.map((product) =>
                        <article key={product._id} className="w-full md:w-96 h-[650px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            
                            <div className ="w-full h-3/4 relative bg-white">
                                <Image className="rounded-t-lg w-full h-full object-cover"
                                src={product.productImages.image_one.image_url} 
                                alt={product.name} 
                                width={300}
                                height={200}
                                />
                                <Link href={`/store/product/${product._id}`} className="w-full absolute left-0 bottom-0 px-5">
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate text-ellipsis">{product.name}</h2>
                                </Link>
                            </div>

                            <div className="w-full px-5 pt-2">
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate text-ellipsis">{product.description}</p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{randsSA.format(product.price)}</h3>
                            </div>

                            <div className="flex w-full px-5 pt-4 gap-2">
                                <Link href={`/store/product/${product._id}`} 
                                className="flex-1 h-10 flex justify-center items-center text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 d">
                                    View product
                                </Link>
                                <button 
                                className="h-10 inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={()=>addToCart(product._id, product.quantity)}
                                >
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                            </button>
                            </div>
                        </article>
                    )
                    }
                </div>: null
            
            }
            

        </div>
    )
}     
