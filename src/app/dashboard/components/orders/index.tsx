"use client";

import { RefreshCw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrdersProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { OrderContext } from "@/providers/order";
import { use } from "react";

interface Props {
  orders: OrdersProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);

  function handleDetailOrder(order_id: string){
    onRequestOpen(order_id);
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.map((order) => (
            <button key={order.id} className={styles.orderItem} onClick={() => handleDetailOrder(order.id)}>
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
