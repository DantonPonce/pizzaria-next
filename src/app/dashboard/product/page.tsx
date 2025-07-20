import { api } from "@/services/api";
import { Form } from "./components/form";
import { getCookieServer } from "@/lib/cookieServer";

export default async function Product() {
  const token = await getCookieServer();

  const response = await api.get("category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const categories = response.data;

  return <Form categories={categories} />;
}
