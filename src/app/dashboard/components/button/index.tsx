"use client";

import { useFormStatus } from "react-dom";
import styles from "./styles.module.scss";
import { LoaderCircle } from "lucide-react";
interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? <LoaderCircle className="loader" size={20} /> : name}
    </button>
  );
}
