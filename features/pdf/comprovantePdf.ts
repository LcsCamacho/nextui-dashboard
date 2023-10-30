import { TransacaoWithVendaAndCliente } from "../../components/transacoes/types";
import { makePdf } from "./baseMakePdf";
import {
  PageOrientation,
  PageSize,
  Margins,
  TDocumentDefinitions,
  Content,
  Column,
  ContentColumns,
  ImageDefinition,
  StyleDictionary,
} from "pdfmake/interfaces";
import { blob } from "stream/consumers";

export const makeComprovantePdf = async (
  transacao: TransacaoWithVendaAndCliente,
  open?: boolean
) => {
  const { cliente, venda } = transacao;
  const { valorTotal, createdAt, produto } = venda;
  const { nome, cpf } = cliente;

  const styles: StyleDictionary = {
    title: {
      fontSize: 18,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 0],
    },
    label: {
      fontSize: 16,
      bold: true,
      alignment: "left",
    },
    value: {
      fontSize: 14,
      alignment: "left",
      margin: [10, 2, 0, 0],
    },
    columnLabelValue: {
      alignment: "center",
      margin: [200, 20, 0, 0],
      columnGap: 0,
    },
    checkInImage: {
      alignment: "center",
      margin: [20, 20, 20, 20],
    },
  };

  const rowWithTwoColumns = (label: string, value: string) => {
    const columns: Column[] = [
      // @ts-ignore
      { text: label, style: "label", width: "auto" },
      // @ts-ignore
      { text: value, style: "value", width: "auto" },
    ];
    return columns;
  };

  const paraRow = rowWithTwoColumns("Para:", "Pri Almeida Modas");
  const deRow = rowWithTwoColumns("De:", nome);
  const cpfRow = rowWithTwoColumns("CPF:", cpf);
  const dataRow = rowWithTwoColumns(
    "Data:",
    new Date(createdAt).toLocaleString("pt-br")
  );
  const valorPagoRow = rowWithTwoColumns("Valor pago:", `R$${valorTotal},00`);
  const valorRestanteRow = rowWithTwoColumns(
    "Valor restante:",
    `R$${transacao.valorRestante},00`
  );
  const produtoRow = rowWithTwoColumns("Produto:", produto);

  const content: Content = [
    {
      text: "Comprovante de pagamento",
      style: "title",
    },
    {
      image: "checkin",
      width: 100,
      height: 100,
      style: "checkInImage",
      margin: [0, 15, 0, 0],
    },
    {
      stack: [
        {
          columns: paraRow,
          style: "columnLabelValue",
        },
        {
          columns: deRow,
          style: "columnLabelValue",
        },
        {
          columns: cpfRow,
          style: "columnLabelValue",
        },
        {
          columns: dataRow,
          style: "columnLabelValue",
        },
        {
          columns: valorPagoRow,
          style: "columnLabelValue",
        },
        {
          columns: valorRestanteRow,
          style: "columnLabelValue",
        },
        {
          columns: produtoRow,
          style: "columnLabelValue",
        },
      ],
      alignment: "center",
    },
  ];

  const fileName = "comprovante.pdf";

  const images: { [key: string]: ImageDefinition } = {
    checkin: {
      url: "https://res.cloudinary.com/dicogrlex/image/upload/v1698624487/hvcottdwiswqkmzjs7ge.png",
    },
  };

  const pdf = await makePdf(content, fileName, images, styles, open);
  return { pdf };
};
