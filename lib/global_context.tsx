"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocalStorage } from "./local_storage";
import Products from "@/lib/data.json";
export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}
interface contextProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  cartList: IProduct[];
  setCartList: Dispatch<SetStateAction<IProduct[]>>;
  addToCart: (id: number, itemQuantity: number) => void;
  removeFromCart: (Id: number) => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
}
const queryClient = new QueryClient();
const GlobalContext = createContext<contextProps>({} as contextProps);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState("Home");
  const [cartList, setCartList] = useLocalStorage<IProduct[]>("localCart", []);

  const addToCart = (id: number, itemQuantity: number) => {
    {
      /*const URL = `https://misterh-api-server.onrender.com/api/products/product/${id}`;
    const fetchData = async (URL: string) => {
      try {
        const response = await fetch(URL);
        const data = response.json();
        const product = await data;
        setCartList((current) =>
          current.find((item) => item.id == id)
            ? current.map((item) =>
                item.id == id
                  ? {
                      ...item,
                      quantity: (item.quantity = item.quantity + itemQuantity),
                    }
                  : { ...item }
              )
            : [...current, { ...product, quantity: itemQuantity }]
        );
      } catch (error) {
        console.log(error);
      }
    };
fetchData(URL);*/
    }
    const product =
      Products.find((product) => product.id === id) || ({} as IProduct);

    setCartList((current) =>
      current.find((item) => item.id == id)
        ? current.map((item) =>
            item.id == id
              ? {
                  ...item,
                  quantity: (item.quantity = item.quantity + itemQuantity),
                }
              : { ...item }
          )
        : [...current, { ...product, quantity: itemQuantity }]
    );
  };
  const removeFromCart = (id: number) => {
    setCartList((current) => current.filter((item) => item.id != id));
  };

  const increaseCartQuantity = (id: number) => {
    setCartList((current) =>
      current.map((item) =>
        item.id == id ? { ...item, quantity: item.quantity + 1 } : { ...item }
      )
    );
  };

  const decreaseCartQuantity = (id: number) => {
    setCartList((current) =>
      current.map((item) =>
        item.id == id ? { ...item, quantity: item.quantity - 1 } : { ...item }
      )
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        selected,
        setSelected,
        cartList,
        setCartList,
        addToCart,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
