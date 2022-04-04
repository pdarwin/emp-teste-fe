import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Grid,
  Popover,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Cupoes({ theme, user, API_URL }) {
  const [cupoes, setCupoes] = React.useState([]);

  React.useEffect(() => {
    getCupoes();
  }, []);

  const navigate = useNavigate();

  function getCupoes() {
    fetch(API_URL + "/getCupoesByClienteId/" + user.id, {
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
        setCupoes(parsedResponse.lista);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const columns = [
    { field: "desconto", headerName: "Desconto", width: 200 },
    ,
  ];

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
            rows={cupoes}
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
