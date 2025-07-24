"use client"

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {

  const {onRequestClose} = use(OrderContext);

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#FF3F4B" />
        </button>

        <article className={styles.articleContainer}>
          <h1>Detalhes do pedido</h1>

          <span className={styles.table}>
            Mesa <b>36</b>
          </span>

          <section className={styles.item}>
            <span>
              1 - <b>Pizza Catupiry</b>
            </span>
            <span className={styles.description}>
              Pizza de granfo com catupiry, borda recheada
            </span>
          </section>

          <button className={styles.buttonOrder}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
