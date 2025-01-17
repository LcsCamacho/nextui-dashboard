import { TransacaoWithVendaAndCliente } from "./types";
import { Text, Col, Row, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ComprovanteContainer } from "./comprovante.styled";
import { FaShare, FaFilePdf } from "react-icons/fa";
import { makeComprovantePdf } from "../../features/pdf/comprovantePdf";
import { useState, useEffect } from "react";

export const Comprovante = ({
  transacao,
}: {
  transacao: TransacaoWithVendaAndCliente;
}) => {
  const [blobPdf, setBlobPdf] = useState<Blob | null>(null);

  const handleClickShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Comprovante de pagamento",
          text: "Comprovante de pagamento",
          files: [
            new File([blobPdf!], "pagamento.pdf", {
              type: "application/pdf",
            }),
          ],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Seu navegador não suporta compartilhamento de arquivos");
    }
  };

  const handleClickMakePdf = async () => {
    const { pdf } = await makeComprovantePdf(transacao, false);
    pdf.getBlob(setBlobPdf);
  };

  return (
    <ComprovanteContainer>
      <Flex
        justify="center"
        align="center"
        direction="column"
        css={{
          gap: "$6",
          overflow: "hidden",
          overflowY: "auto",
          pb: "$10",
        }}
      >
        <Text h1>Comprovante</Text>
        <AiOutlineCheckCircle
          color={"var(--nextui-colors-green700)"}
          size={"150"}
        />
        <Text css={{ textAlign: "center" }} h3>
          Pagamento feito com sucesso!
        </Text>
        <Col
          css={{
            jc: "center",
            ai: "center",
            gap: "$4",
            mt: "$6",
            display: "flex",
            fd: "column",
          }}
        >
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Data:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {new Date(transacao.createdAt).toLocaleString()}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor total da compra:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.venda.valorTotal},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor pago:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.valor},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Valor restante:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              R${transacao.valorRestante},00
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Produto:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.venda.produto}
            </Text>
          </Row>

          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Cliente:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.nome}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Telefone:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.telefone}
            </Text>
          </Row>
          <Row
            css={{
              ai: "center",
              jc: "center",
              gap: "$2",
              "@smMax": {
                ai: "flex-start",
                jc: "flex-start",
              },
            }}
          >
            <Text b size={18} css={{ color: "$accents9" }}>
              Endereço:
            </Text>
            <Text b size={16} css={{ color: "$accents7" }}>
              {transacao.cliente.rua} {transacao.cliente.numero},{" "}
              {transacao.cliente.bairro}, {transacao.cliente.cidade}
            </Text>
          </Row>
        </Col>
        <Row css={{ gap: "$6", mt: "$12", jc: "center", flexWrap: "wrap" }}>
          {/* <Button onClick={handleClickShare}>
            <Text b size={18} css={{ color: "$white", mr: "$5" }}>
              Compartilhar
            </Text>{" "}
            <FaShare />
          </Button> */}
          <Button
            css={{
              backgroundColor: "$error",
              "@xsMax": {
                width: "100%",
              },
            }}
            onClick={handleClickMakePdf}
          >
            <Text
              b
              size={18}
              css={{
                color: "$white",
                mr: "$5",
                "@xsMax": {
                  width: "100%",
                },
              }}
            >
              Gerar PDF
            </Text>{" "}
            <FaFilePdf />
          </Button>
          {!!blobPdf && (
            <Button
              css={{
                backgroundColor: "$primaryBorder",
                "@xsMax": {
                  width: "100%",
                },
              }}
              onClick={handleClickShare}
            >
              <Text
                b
                size={18}
                css={{
                  color: "$white",
                  mr: "$5",
                  "@xsMax": {
                    width: "100%",
                  },
                }}
              >
                Compartilhar PDF gerado
              </Text>{" "}
              <FaShare />
            </Button>
          )}
        </Row>
      </Flex>
    </ComprovanteContainer>
  );
};
