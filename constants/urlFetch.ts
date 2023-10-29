export const urlLocal = "http://localhost:3000/api";
export const urlProd = "https://primodas.vercel.app/api";
export const currentUrl = process.env.NODE_ENV === "development" ? urlLocal : urlProd;