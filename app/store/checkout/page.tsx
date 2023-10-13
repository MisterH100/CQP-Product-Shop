'use client'
import { ConatctForm } from "@/app/components/ContactForm";
import { Table } from "@/app/components/Table";
import { useCartContext } from "@/app/context/CartContext"


const CheckoutPage =() =>{
    const {cartList} = useCartContext();
    return(
        <section className="w-full pt-20">
            <div>
                <p className="text-sm text-white"> <span className="text-red-500">*Note: </span>
                    The following list of Products shown in the table bellow will be sent to the seller whom you will get in contact with you to finalise the purchase, Please fill in the form as contact information is required for this process to proceed.
                </p>
            </div>
            <Table cartList={cartList}/>
            <ConatctForm cartList={cartList}/>
        </section>
    )
}

export default CheckoutPage