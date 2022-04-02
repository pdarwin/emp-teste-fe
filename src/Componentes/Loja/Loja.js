import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@material-ui/core";
import { AddTask, DoNotDisturbAltOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Typography,
} from "@mui/material";
import { green, indigo, red } from "@mui/material/colors";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Loja({ theme, addItem, API_URL }) {
  const [livros, setLivros] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getLivros();
  }, []);

  //Gestão do modal
  const [open, setOpen] = React.useState(false);
  const [errLevel, setErrLevel] = React.useState("error");
  const [err, setErr] = React.useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert severity={errLevel}>{err}</Alert>
      </Modal>
      <Typography variant="h4" my={4} align="center" color="primary">
        Bem vindo à Livraria Requalificar
      </Typography>
      <Typography variant="h5" my={4} align="center" color="primary">
        Consulte a nossa montra de livros
      </Typography>

      <Box style={{ backgroundColor: indigo[900] }} sx={{ p: 1 }}>
        <ImageList sx={{ width: "100%", height: "100%" }} cols={6} gap={9}>
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
                    {livro.stock > 0 ? (
                      <Tooltip title="em stock, clique para adicionar ao carrinho de compras">
                        <AddTask
                          sx={{ color: green[300] }}
                          onClick={() => {
                            addItem(livro);
                            setErr(
                              livro.titulo +
                                " adicionado ao carrinho de compras"
                            );
                            setErrLevel("success");
                            handleOpen();
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="esgotado">
                        <DoNotDisturbAltOutlined sx={{ color: red[400] }} />
                      </Tooltip>
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
