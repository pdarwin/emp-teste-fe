import {
  Button,
  Grid,
  InputLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function InfoLivro({ theme, carrinho, API_URL }) {
  const params = useParams();
  const [livro, setLivro] = useState({
    titulo: "",
    isbn: "",
    data_lancamento: null,
    num_paginas: 0,
    sinopse: "",
    edicao: "",
    imagem_capa: "",
    preco: 0,
    stock: 0,
    autores: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("Este livro não existe na base de dados");
      return;
    }
    getLivro();
  }, []);

  function getLivro() {
    fetch(API_URL + "/getLivroById/" + params.id, {
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
        setLivro(parsedResponse.optional);
      })
      .catch((error) => {
        alert(error);
      });
  }
  //teste
  return livro !== {} ? (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: indigo[100], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ backgroundColor: indigo[300], color: "white" }}
            align="center"
          >
            {livro.titulo}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={livro.imagem_capa} />
        </Grid>
        <Grid item xs={6}>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <InputLabel style={{ backgroundColor: indigo[300] }}>
                Sinopse
              </InputLabel>
              <Typography variant="subtitle">{livro.sinopse}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                {"N.º de páginas: " + livro.num_paginas}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                {"ISBN: " + livro.isbn}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                {"Edição: " + livro.edicao}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                {"Data de lançamento: " + livro.data_lancamento}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              carrinho.addItem(livro);
            }}
          >
            Adicionar ao carrinho: {livro.preco}€
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <Typography variant="h1">
      Não conseguimos achar este livro na base de dados
    </Typography>
  );
}
