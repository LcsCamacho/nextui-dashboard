const isDev = process.env.NODE_ENV === "development";
// export const myUrl = isDev ? "http://localhost:3000" : "https://primodas.vercel.app";
export const myUrl =  "https://primodas.vercel.app";
export const routes = {
  home: '/',
  transacoes: `${myUrl}/api/transacao`,
  vendas: `${myUrl}/api/vendas`,
  clientes: `${myUrl}/api/clientes`,
}
