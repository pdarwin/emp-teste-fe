import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "titulo", headerName: "Título", width: 200 },
  { field: "preco", headerName: "Preço", width: 200 },
];

export default function Loja({ theme, user, API_URL }) {
  const [livros, setLivros] = React.useState([]);

  React.useEffect(() => {
    getLivros();
  }, []);

  function getLivros() {
    fetch(API_URL + "/getLivros", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setLivros(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" my={4} align="center" color="primary">
        Bem vindo à Livraria Requalificar
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={livros}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </ThemeProvider>
  );
}
