import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { Button, Input } from "@nextui-org/react";
import { ExportIcon } from "../icons/accounts/export-icon";
import { VendaWithCliente } from "./types";
import { AddVenda } from "./add-venda";
import { TableWrapperVendas } from "./table/table";
import { useState } from "react";
import { VendasServices } from "./services";
import { DetailsVenda } from "./details";
import { EditarVenda } from "./edit";

const Vendas = ({ vendas }: { vendas: VendaWithCliente[] }) => {
  const [vendasState, setVendas] = useState<VendaWithCliente[]>(vendas);
  const [loading, setLoading] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [vendaSelected, setVendaSelected] = useState<VendaWithCliente | null>(
    null
  );

  const showDetails = (venda: VendaWithCliente) => {
    setVendaSelected(venda);
    setShowModalDetails(true);
  };

  const showEditVenda = (venda: VendaWithCliente) => {
    setVendaSelected(venda);
    setShowModalEdit(true);
  };

  const fetchVendas = async () => {
    setLoading(true);
    const vendas = await VendasServices.getVendasWithIncludes({
      includeCliente: true,
      includeTransactions: true,
    });
    setVendas(vendas);
    setLoading(false);
  };

  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <p>/</p>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Vendas</CrumbLink>
          <p>/</p>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">Lista</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <p>Todas as vendas</p>
      <Flex
        css={{ gap: "$8", flexDirection: "column", mt: "$6", mb: "$6" }}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            width: "100%",
            "@smMax": {
              fd: "column",
              gap: "$4",
              jc: "center",
              ai: "center",
            },
          }}
          align={"center"}
        >
          <Input
            css={{
              width: "100%",
              maxWidth: "410px",
              "@smMax": {
                maxWidth: "100%",
              },
            }}
            placeholder="Buscar vendas"
          />
          <AddVenda refreshVendas={() => fetchVendas()} />
          {/* <Button>
            <ExportIcon /> Exportar para Excel
          </Button> */}
        </Flex>
        {!!vendaSelected && showModalEdit && (
          <EditarVenda
            refreshVendas={fetchVendas}
            isShow={showModalEdit}
            closeHandler={() => setShowModalEdit(false)}
            venda={vendaSelected!}
          />
        )}
        {!!vendaSelected && showModalDetails && (
          <DetailsVenda
            isShow={showModalDetails}
            closeHandler={() => setShowModalDetails(false)}
            venda={vendaSelected!}
          />
        )}
        <TableWrapperVendas
          handleClickEdit={showEditVenda}
          handleClickDetails={showDetails}
          loading={loading}
          vendas={vendasState}
        />
      </Flex>
    </Flex>
  );
};

export default Vendas;
