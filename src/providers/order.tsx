"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { createContext, ReactNode, useState } from "react";

export interface OrderItemProps {
  id:         string;
  amount:     number;
  created_at: Date;
  updated_at: Date;
  order_id:   string;
  product_id: string;
  product:    Product;
  order:      Order;
}

export interface Order {
  id:         string;
  table:      number;
  status:     boolean;
  draft:      boolean;
  name:       string;
}

export interface Product {
  id:          string;
  name:        string;
  price:       string;
  description: string;
  banner:      string;
  category_id: string;
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => void;
  onRequestClose: () => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>();

  async function onRequestOpen(order_id: string) {
    setIsOpen(true);

    const token = await getCookieClient();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{
        order_id: order_id
      }
    });

    console.log(response.data);
    
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
