const isDev = process.env.NODE_ENV === "development";
// export const myUrl = isDev ? "http://localhost:3000" : "https://primodas.vercel.app";
// export const myUrl =  "https://primodas.vercel.app";
export const routes = {
  home: '/',
  transacoes: `/transacao`,
  estoque: `/estoque`,
  vendas: `/vendas`,
  clientes: `/clientes`,
}
