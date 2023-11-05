import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { TarefasService } from '../components/tarefas/services';
import { TarefaToBeCreated } from '../components/tarefas/types';
import { Prisma } from '@prisma/client';
import { AxiosError } from 'axios';

describe("Tarefas", () => {
  it("should create tarefa", async () => {
    const tarefaToBeCreatedMock:TarefaToBeCreated = {
      id: "tarefa-teste",
      nome: "Tarefa Teste",
      descricao: "Tarefa Teste Descricao",
      tempo: 0,
      projetoId: "cd98703d-7eb3-441a-8922-4793390b9cd7",
    } 
    const tarefa = await TarefasService.createTarefa(tarefaToBeCreatedMock as any);
    expect(tarefa).toHaveProperty("success", true);
    expect(tarefa).toHaveProperty("id", expect.any(String));
  });
  it("should return error create tarefa", async () => {
    const tarefaToBeCreatedMock = {
      tempo: 0,
      projetoId: "cd98703d-7eb3-441a-8922-4793390b9cd7",
    }
    try {
      await TarefasService.createTarefa(tarefaToBeCreatedMock as any);
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });
  it("should update time", async () => {
    const tarefa = await TarefasService.saveTime("tarefa-teste", Math.floor(Math.random() * 1000) + 1);
    expect(tarefa).toEqual({
      success: true,
      id: expect.any(String),
    });
  });
  it("should return error update time", async () => {
    try {
      await TarefasService.saveTime("tarefa-teste", -1);
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });
  it("should get tarefas", async () => {
    const tarefas = await TarefasService.getTarefas();
    expect(tarefas).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      nome: expect.any(String),
      descricao: expect.any(String),
      tempo: expect.any(Number),
      projetoId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      projeto: expect.any(Object),
    }]));
  });
  it("should delete tarefa", async () => {
    const tarefa = await TarefasService.deleteTarefa("tarefa-teste");
    expect(tarefa).toHaveProperty("success", true);
  });

});