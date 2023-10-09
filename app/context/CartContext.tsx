'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { IProducts } from "../interfaces/ProductInterface";
import { useLocalStroge } from "../hooks/useLocalStorage";


interface contextProps{
    cartList: IProducts[],
    setCartList: (Dispatch<SetStateAction<IProducts[]>>),
    addToCart: (id: number, itemQuantity: number) => void,
    removeFromCart: (Id: number) => void,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void
}

const CartContext = createContext<contextProps>({} as contextProps)

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartList, setCartList] = useLocalStroge<IProducts[]>("localCart",[])

    const addToCart = (id: number,itemQuantity: number) =>{
        const URL = `https://misterh-api-server.onrender.com/api/products/product/${id}`
        const fetchData= async (URL:string) => {
            try {
                const response = await fetch(URL);
                const data = response.json();
                const product = await data;
                setCartList(current => current.find(item => item._id == id )? current.map(item => item._id == id?{...item, quantity: item.quantity = item.quantity + itemQuantity }: {...item}) : [...current, {...product, quantity: itemQuantity}])
            } catch (error) {
                console.log(error);
            }
        }
        fetchData(URL)
    }
    const removeFromCart = (id: number) =>{
        setCartList(current => current.filter(item => item._id != id));
    }

    const increaseCartQuantity =(id: number) =>{
        setCartList(current => current.map(item => item._id == id?{...item, quantity: item.quantity + 1}: {...item} ))
    }

    const decreaseCartQuantity =(id: number) =>{
        setCartList(current => current.map(item => item._id == id?{...item, quantity: item.quantity -1}:{...item} ))

    }

return (
    <CartContext.Provider value={{cartList,setCartList,addToCart,removeFromCart,increaseCartQuantity, decreaseCartQuantity}}>
        {children}
    </CartContext.Provider>
);
};

export const useCartContext = () => useContext(CartContext);