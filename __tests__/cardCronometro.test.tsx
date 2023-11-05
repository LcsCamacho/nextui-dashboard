import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

import { CardCronometro } from "../components/tarefas/card-cronometro";
import { TarefasService } from "../components/tarefas/services";

describe("CardCronometro", () => {
  it("should have tarefa description", async () => {
    const tarefas = await TarefasService.getTarefas();
    const {getByText} = render(<CardCronometro refresh={async () => {}} tarefa={tarefas[0]} />);
    expect(getByText(tarefas[0].descricao)).toBeInTheDocument();
  });
  
});