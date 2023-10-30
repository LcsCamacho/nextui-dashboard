import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {
  PageOrientation,
  PageSize,
  Margins,
  TDocumentDefinitions,
  Content,
  ImageDefinition,
  StyleDictionary
} from "pdfmake/interfaces";

export const makePdf = async (
  content: Content,
  fileName: string,
  images: { [key: string]: ImageDefinition },
  styles: StyleDictionary,
  open?: boolean
) => {
  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

  const pageMargins: Margins = [40, 40, 40, 40];

  const pageOrientation: PageOrientation = "portrait";

  const pageSize: PageSize = { width: 700, height: "auto" };


  const docDefinition: TDocumentDefinitions = {
    info: {
      title: fileName,
      author: "Lucas Camacho",
      creationDate: new Date(),
      creator: "Lucas Camacho",
      producer: "Lucas Camacho",
    },
    pageSize,
    pageOrientation,
    pageMargins,
    content,
    styles,
    images,
    
  };


  const pdf = pdfMake.createPdf(docDefinition);

  if (open) pdf.open();
};
