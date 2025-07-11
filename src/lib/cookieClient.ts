import { getCookie } from "cookies-next";
// A biblioteca cookies-next permite manipular cookies no lado do cliente e do servidor

export function getCookieClient() {
  const token = getCookie("session");
  return token || null;
}
