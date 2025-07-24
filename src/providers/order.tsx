"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

export interface OrderItemProps {
  id: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  order_id: string;
  product_id: string;
  product: Product;
  order: Order;
}

export interface Order {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(order_id: string) {
    const token = await getCookieClient();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id: order_id,
      },
    });

    setOrder(response.data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = await getCookieClient();

    const data = {
      order_id: order_id,
    };

    try {
      await api.put("order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Falaha ao finalizar este pedido!");
      return;
    }

    toast.success("Pedido concluído com sucesso!");
    router.refresh();
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        order,
        finishOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
