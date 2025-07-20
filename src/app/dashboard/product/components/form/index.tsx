"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: number;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();

  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!categoryIndex || !name || !price || !description || !image) {
      toast.warning("Preencha todos os campos obrigatórios");
      return;
    }
    const request = new FormData();

    request.append("name", name);
    request.append("price", name);
    request.append("description", description);
    request.append(
      "category_id",
      categories[Number(categoryIndex)].id.toString()
    );
    request.append("file", image);

    const token = getCookieClient();

    await api
      .post("product", request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Falha ao cadastrar o produto");
      });

    toast.success("Produto registrado com sucesso!");
    router.push("/dashboard");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        toast.warning("Formato de imagem inválido. Use PNG ou JPEG.");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className={styles.input}
          name="name"
          placeholder="Digite o nome do produto..."
          required
        />

        <input
          type="text"
          className={styles.input}
          name="price"
          placeholder="Preço do produto..."
          required
        />

        <textarea
          name="description"
          className={styles.input}
          placeholder="Digite a descrição do produto..."
          required
        ></textarea>

        <Button name="Cadastrat produto" />
      </form>
    </main>
  );
}
