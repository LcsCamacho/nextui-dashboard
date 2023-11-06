import { VendasServices } from "../components/vendas/services";
import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { urlLocal } from "../constants/urlFetch";
import { VendaToBeCreated } from "../components/vendas/types";
import UserEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

const id = randomUUID();

const vendaToBeCreatedMock: VendaToBeCreated = {
  id: id,
  clienteId: "df850388-defc-48ca-84c3-cb636838f6c1",
  produto: "Produto Teste",
  valor: 9999,
};

describe("Vendas", () => {
  it("should create venda", async () => {
    const venda = await VendasServices.createVenda(
      vendaToBeCreatedMock as any,
      urlLocal
    );
    expect(venda).toHaveProperty("success", true);
    expect(venda).toHaveProperty("id", expect.any(String));
  });
  // it("should return error create venda", async () => {
  //   try {
  //     await VendasServices.createVenda({} as any, urlLocal);
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(AxiosError);
  //   }
  // });
  it("should get vendas", async () => {
    const vendas = await VendasServices.getVendas(urlLocal);
    expect(vendas).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          clienteId: expect.any(String),
          produto: expect.any(String),
          createdAt: expect.any(String),
          pago: expect.any(Boolean),
          updatedAt: expect.any(String),
          valorPago: expect.any(Number),
          valorTotal: expect.any(Number),
        },
      ])
    );
  });

  it("should update venda", async () => {
    const vendaToBeUpdatedMock = {
      clienteId: "df850388-defc-48ca-84c3-cb636838f6c1",
      id: id,
      pago: false,
      valorPago: 1,
      valorTotal: 9999,
    }
    const venda = await VendasServices.updateVenda(vendaToBeUpdatedMock as any, urlLocal);
    expect(venda).toHaveProperty("success", true);
    expect(venda).toHaveProperty("vendaId", expect.any(String));
    expect(venda).toHaveProperty("transacaoId", expect.any(String));

  }, 2000);
  // it("should return error update venda", async () => {
  //   try {
  //     await VendasServices.updateVenda({} as any, urlLocal);
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(AxiosError);
  //   }
  // });
  it("should delete venda", async () => {
    const venda = await VendasServices.deleteVenda(id, urlLocal);
    expect(venda).toHaveProperty("success", true);
  }, 5000);
});
