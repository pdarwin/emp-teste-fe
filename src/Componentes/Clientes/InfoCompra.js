import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, ThemeProvider } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function InfoCompra({ theme, user, detalheCompra }) {
  const navigate = useNavigate();

  console.log(detalheCompra);

  const columns = [{ field: "titulo", headerName: "Título", width: 200 }, ,];

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
            rows={detalheCompra}
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
