import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Preferencias({ theme, setUser, user, API_URL }) {
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
          <Typography variant="h5" my={4} color={indigo[800]}>
            Preferências do utilizador {user.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Em desenvolvimento</Typography>
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
