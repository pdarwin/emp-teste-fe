import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, ThemeProvider } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "data", headerName: "Data", width: 200 },
  { field: "valor", headerName: "Valor", width: 200 },
  ,
];

export default function Compras({ theme, user, API_URL }) {
  const [compras, setCompras] = React.useState([]);

  React.useEffect(() => {
    getCompras();
  }, []);

  const navigate = useNavigate();

  function getCompras() {
    fetch(API_URL + "/getComprasByClienteId/" + user.id, {
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
        console.log(parsedResponse);
        setCompras(parsedResponse.lista);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: indigo[100], p: 8 }}
      >
        <Grid item xs={12}>
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={compras}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
            size="small"
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
