import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

const columns = [
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "morada", headerName: "Morada", width: 200, editable: true },
  { field: "data_nascimento", headerName: "Data nasc.", width: 70 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 10,
  },
  ,
];

export default function Clientes({ theme, modalControls, API_URL }) {
  const [clientes, setClientes] = React.useState([]);

  React.useEffect(() => {
    getClientes();
  }, []);

  const navigate = useNavigate();

  function getClientes() {
    fetch(API_URL + "/getClientes", {
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
        setClientes(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" my={3} align="center" color="primary">
        Gestão de clientes
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: indigo[100], p: 8 }}
      >
        <Grid item xs={12}>
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={clientes}
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
