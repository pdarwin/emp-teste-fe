import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Contactos({ theme }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: indigo[100], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" my={4}>
            Contactos Livraria Requalificar
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Morada:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Telefone:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Email:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ m: 3 }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
