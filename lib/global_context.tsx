"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocalStorage } from "./local_storage";
import axios from "axios";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  description: string;
  in_stock: number;
  price: number;
  quantity: number;
  categories: string[];
  reviews: [];
  images: string[];
  createdAt: Date;
}

export interface IOrderData {
  order_number: string;
  address: string;
  order_date: Date;
  payment_method: string;
}
export interface INotification {
  _id: string;
  title: string;
  message: string;
  read: boolean;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profileImage: string;
  address: string;
  phone: string;
  createdAt: Date;
}

interface contextProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  cartList: IProduct[];
  setCartList: Dispatch<SetStateAction<IProduct[]>>;
  orderData: IOrderData;
  setOrderData: Dispatch<SetStateAction<IOrderData>>;
  addToCart: (id: string, itemQuantity: number) => void;
  removeFromCart: (Id: string) => void;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
}
const queryClient = new QueryClient();
const GlobalContext = createContext<contextProps>({} as contextProps);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useLocalStorage("user", {} as IUser);
  const [token, setToken] = useLocalStorage("token", "");
  const [selected, setSelected] = useState("Home");
  const [cartList, setCartList] = useLocalStorage<IProduct[]>("localCart", []);
  const [orderData, setOrderData] = useState({} as IOrderData);

  const addToCart = (id: string, itemQuantity: number) => {
    {
      const URL = `https://nodeserver-v2.onrender.com/api/products/id/${id}`;
      const fetchData = async (URL: string) => {
        try {
          const response = await fetch(URL);
          const data = response.json();
          const product = await data;
          setCartList((current) =>
            current.find((item) => item._id == id)
              ? current.map((item) =>
                  item._id == id
                    ? {
                        ...item,
                        quantity: (item.quantity =
                          item.quantity + itemQuantity),
                      }
                    : { ...item }
                )
              : [...current, { ...product, quantity: itemQuantity }]
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(URL);
    }
  };
  const removeFromCart = (id: string) => {
    setCartList((current) => current.filter((item) => item._id != id));
  };

  const increaseCartQuantity = (id: string) => {
    setCartList((current) =>
      current.map((item) =>
        item._id == id ? { ...item, quantity: item.quantity + 1 } : { ...item }
      )
    );
  };

  const decreaseCartQuantity = (id: string) => {
    setCartList((current) =>
      current.map((item) =>
        item._id == id ? { ...item, quantity: item.quantity - 1 } : { ...item }
      )
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        selected,
        setSelected,
        cartList,
        setCartList,
        orderData,
        setOrderData,
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
