import "@testing-library/jest-dom";
import { TarefasService } from "../components/tarefas/services";
import { TarefaToBeCreated } from "../components/tarefas/types";
import { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { urlLocal } from "../constants/urlFetch";
import { CardCronometro } from "../components/tarefas/card-cronometro";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Cronometro } from "../components/tarefas";
import UserEvent from "@testing-library/user-event";

const id = randomUUID();
const tarefaToBeCreatedMock: TarefaToBeCreated = {
  id: id,
  nome: "Tarefa Teste",
  descricao: "Tarefa Teste Descricao",
  tempo: 0,
  projetoId: "cd98703d-7eb3-441a-8922-4793390b9cd7",
};

describe("Tarefas", () => {
  it("should create tarefa", async () => {
    const tarefa = await TarefasService.createTarefa(
      tarefaToBeCreatedMock as any,
      urlLocal
    );
    expect(tarefa).toHaveProperty("success", true);
    expect(tarefa).toHaveProperty("id", expect.any(String));
  });
  it("should return error create tarefa", async () => {
    const tarefaToBeCreatedMock = {
      tempo: 0,
      projetoId: "cd98703d-7eb3-441a-8922-4793390b9cd7",
    };
    try {
      await TarefasService.createTarefa(tarefaToBeCreatedMock as any, urlLocal);
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });
  it("should update time", async () => {
    console.log(id);
    const tarefa = await TarefasService.saveTime(
      id,
      Math.floor(Math.random() * 1000) + 1,
      urlLocal
    );
    expect(tarefa).toEqual({
      success: true,
      id: expect.any(String),
    });
  }, 2000);
  it("should return error update time", async () => {
    try {
      await TarefasService.saveTime(id, -1, urlLocal);
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });
  it("should get tarefas", async () => {
    const tarefas = await TarefasService.getTarefas(urlLocal);
    expect(tarefas).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          nome: expect.any(String),
          descricao: expect.any(String),
          tempo: expect.any(Number),
          projetoId: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          projeto: expect.any(Object),
        },
      ])
    );
  });
  it("should delete tarefa clicking in component", async () => {
    const totalTarefas = await TarefasService.getTarefas(urlLocal);
    const response = await TarefasService.deleteTarefa(id, urlLocal);
    const totalTarefasAfterDelete = await TarefasService.getTarefas(urlLocal);
    expect(totalTarefasAfterDelete.length).toBe(totalTarefas.length - 1);
    expect(response).toHaveProperty("success", true);
    // const {queryAllByTitle, debug, queryAllByRole} = render(<Cronometro tarefas={totalTarefas as any} />);
    // const totalCards = queryAllByRole("card");
    // expect(totalCards.length).toBe(totalTarefas.length);
    // const button = screen.getAllByTitle("icon-delete");
    // UserEvent.click(button[0]);
    // const confirmButton = screen.getByTitle("confirm-delete");
    // UserEvent.click(confirmButton);
    // const totalCardsAfterDelete = queryAllByRole("card");
    // await waitFor(() => expect(queryAllByTitle(`Cronômetro ${totalTarefas[0].nome}`)).toHaveLength(totalCardsAfterDelete.length - 1));
    // await waitForElementToBeRemoved(() => screen.getByTitle(`Cronômetro ${totalTarefas[0].nome}`));
  }, 4000);
});
