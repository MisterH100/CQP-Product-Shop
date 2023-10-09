'use client'
import { Cart } from "@/app/components/Cart"
import { useCartContext } from "@/app/context/CartContext"
import { IProducts } from "@/app/interfaces/ProductInterface"
import { useEffect, useState } from "react"


const CartPage = () =>{
    return(
        <section className="w-full min-h-screen pt-8 bg-white dark:bg-gray-900">
            <Cart/>
        </section>
    )
}

export default CartPage