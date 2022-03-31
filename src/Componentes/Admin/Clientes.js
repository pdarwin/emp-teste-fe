import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";

const columns = [
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "morada", headerName: "Morada", width: 200, editable: true },
  { field: "data_nascimento", headerName: "Data nasc.", width: 70 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 5,
    editable: true,
  },
  ,
];

export default function Clientes({ theme, API_URL }) {
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    fetch(API_URL + "/getClientes", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setClientes(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={clientes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </ThemeProvider>
  );
}
