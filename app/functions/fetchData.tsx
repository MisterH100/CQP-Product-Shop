import { Dispatch, SetStateAction } from "react";
import { IProducts } from "../interfaces/ProductInterface";

export const fetchData= async (URL:string, setSate:Dispatch<SetStateAction<IProducts>> | Dispatch<SetStateAction<IProducts[]>>,setLoadingState:Dispatch<SetStateAction<boolean>>) => {
    try {
        setLoadingState(true)
        const response = await fetch(URL);
        const data = response.json();
        setSate(await data);
        setLoadingState(false)

    } catch (error) {
        console.log(error);
    }
}