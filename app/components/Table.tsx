import { randsSA } from "../functions/formatToRands"
import { IProducts } from "../interfaces/ProductInterface"

export const Table =({cartList}:{cartList: IProducts[]})=>{
    const total = cartList.map((product) => {return product.price * product.quantity }).reduce((prev, curr) => prev + curr, 0)
    return(
        <div className="relative overflow-x-auto pt-10">
            <h1 className="text-black dark:text-white text-lg font-bold pl-6">Items in your cart</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-t border-gray-500">
                <thead className="text-xs text-gray-700 uppercase dark:border-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartList.map(item =>
                            
                        <tr className="border-t border-b border-gray-700" key={item._id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-4">
                                {randsSA.format(item.price)}
                            </td>
                        </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="px-6 py-3">{cartList.length}</td>
                        <td className="px-6 py-3">{cartList.length< 1?null:randsSA.format(total)}</td>
                    </tr>
                </tfoot>
            </table>
    </div>
    )
} 