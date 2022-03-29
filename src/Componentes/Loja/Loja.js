import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";

export function Loja(props) {
  return (
    <ThemeProvider theme={props.theme}>
      <Typography variant="h4" my={4} align="center" color="primary">
        Bem vindo à Livraria Requalificar
      </Typography>
    </ThemeProvider>
  );
}
