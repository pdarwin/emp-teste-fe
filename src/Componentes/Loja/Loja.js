import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@material-ui/core";
import { AddTask, DoNotDisturbAltOutlined } from "@mui/icons-material";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { green, indigo, red } from "@mui/material/colors";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Loja({ theme, user, addItem, modalControls, API_URL }) {
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

      <Box
        style={{ backgroundColor: indigo[900] }}
        sx={{ p: 1 }}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <ImageList
          sx={{ width: 800, height: 500 }}
          cols={8}
          gap={9}
          rowHeight={30}
        >
          {livros.map((livro) => (
            <ImageListItem key={livro.id}>
              <img
                src={livro.imagem_capa}
                loading="lazy"
                onClick={() => {
                  navigate("/livros/" + livro.id);
                }}
                style={{ cursor: "pointer" }}
              />
              <ImageListItemBar
                title={livro.titulo}
                subtitle={
                  <span>
                    preço: {livro.preco}€{" "}
                    {user.id != "" && !user.staff ? (
                      <>
                        (
                        {livro.stock > 0 ? (
                          <Tooltip title="Em stock, clique para adicionar ao carrinho de compras">
                            <AddTask
                              sx={{ color: green[300] }}
                              onClick={() => {
                                addItem(livro);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="esgotado">
                            <DoNotDisturbAltOutlined sx={{ color: red[400] }} />
                          </Tooltip>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                }
                position="below"
                sx={{ color: indigo[100] }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </ThemeProvider>
  );
}
