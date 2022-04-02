import { ThemeProvider } from "@emotion/react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Loja({ theme, user, API_URL }) {
  const [livros, setLivros] = React.useState([]);

  const navigate = useNavigate();

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
      <Typography variant="h5" my={4} align="center" color="primary">
        Consulte a nossa montra de livros
      </Typography>

      <Box style={{ backgroundColor: indigo[900] }}>
        <ImageList
          sx={{ width: "100%", height: "100%" }}
          cols={4}
          rowHeight={250}
        >
          {livros.map((livro) => (
            <Link key={livro.id} variant="body2" color={indigo[100]}>
              <ImageListItem
                key={livro.id}
                onClick={() => {
                  navigate("/livros/" + livro.id);
                }}
              >
                <img src={livro.imagem_capa} loading="lazy" />
                <ImageListItemBar
                  title={livro.titulo}
                  subtitle={<span>preço: {livro.preco}€</span>}
                  position="below"
                  key={livro.id}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
    </ThemeProvider>
  );
}
