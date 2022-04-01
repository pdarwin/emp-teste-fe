import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { styled } from "@mui/system";
import { set } from "date-fns";

const columns = [
  { field: "titulo", headerName: "Título", width: 200 },
  { field: "preco", headerName: "Preço", width: 200 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 5,
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 5,
    editable: true,
  },
];

export default function Livros({ theme, user, API_URL }) {
  const [livros, setLivros] = React.useState([]);
  const [autores, setAutores] = React.useState([]);
  const [selAutores, setSelAutores] = React.useState([]);
  const [livro, setLivro] = React.useState({
    titulo: "",
    isbn: "",
    data_lancamento: null,
    num_paginas: 0,
    sinopse: "",
    edicao: "",
    imagem_capa: "",
    preco: 0,
    autores: [],
  });

  //Gestão do modal
  const [open, setOpen] = React.useState(false);
  const [errLevel, setErrLevel] = React.useState("error");
  const [err, setErr] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const Input = styled("input")({
    display: "none",
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  React.useEffect(() => {
    getLivros();
    getAutores();
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

  function getAutores() {
    fetch(API_URL + "/getAutores", {
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
        setAutores(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    if (valida()) {
      {
        // Ciclo para preencher os autores selecionados
        selAutores.map((aut) => {
          livro.autores.push({ id: parseInt(aut) });
        });
      }

      fetch(API_URL + "/addLivro", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          titulo: livro.titulo,
          isbn: livro.isbn,
          data_lancamento: livro.data_lancamento,
          num_paginas: livro.num_paginas,
          sinopse: livro.sinopse,
          edicao: livro.edicao,
          imagem_capa: livro.imagem_capa,
          preco: livro.preco,
          autores: livro.autores,
          ativo: true,
        }),
      })
        .then((response) => {
          // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
          console.log(response);
          /*           if (response.status !== 200) {
            throw new Error(response.status.toString);
          } */

          return response.json();
        })
        .then((parsedResponse) => {
          if (parsedResponse.statusOk) {
            livro.id = parsedResponse.newID;
            livro.ativo = true;
            setLivros([...livros, livro]);
            setLivro({
              ...livro,
              titulo: "",
              isbn: "",
              data_lancamento: null,
              num_paginas: 0,
              sinopse: "",
              edicao: "",
              imagem_capa: "",
              preco: 0,
              autores: [],
            });
            setErr("Registo bem sucedido");
            setErrLevel("success");
            handleOpen();
          } else {
            setErr(parsedResponse.msg);
            setErrLevel("error");
            handleOpen();
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function valida() {
    setErrLevel("error");
    if (livro.titulo === "") {
      setErr("Título não preenchido");
      handleOpen();
      return false;
    }
    if (livro.isbn === "") {
      setErr("ISBN não preenchido");
      handleOpen();
      return false;
    }
    if (livro.sinopse === "") {
      setErr("Sinopse não preenchida");
      handleOpen();
      return false;
    }
    if (livro.edicao === "") {
      setErr("Edição não preenchida");
      handleOpen();
      return false;
    }
    if (livro.imagem_capa === "") {
      setErr("É necessário escolher uma imagem de capa");
      handleOpen();
      return false;
    }
    if (livro.data_lancamento === null) {
      setErr("Data de lançamento não preenchida");
      handleOpen();
      return false;
    }
    if (livro.num_paginas === 0) {
      setErr("O número de páginas tem de ser maior que zero");
      handleOpen();
      return false;
    }
    if (livro.preco === 0) {
      setErr("O preço tem de ser maior que zero");
      handleOpen();
      return false;
    }
    if (selAutores.length === 0) {
      setErr("Associe pelo menos um autor");
      handleOpen();
      return false;
    }
    return true;
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" my={3} align="center" color="primary">
        Gestão de livros
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={livros}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <form className="form">
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            /*               onClick={() => {
                if (errLevel === "success") navigate("/");
              }} */
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Alert severity={errLevel}>{err}</Alert>
          </Modal>
        </div>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ backgroundColor: indigo[100], p: 8 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Registo de livro</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Título"
                value={livro.titulo}
                onChange={(e) => {
                  setLivro({ ...livro, titulo: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="autor_l">Autor</InputLabel>
              <Select
                labelId="autor"
                id="autor"
                multiple
                value={selAutores}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  setSelAutores(
                    // On autofill we get a stringified value.
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((obj) => (
                      <Chip key={obj} label={autores[parseInt(obj) - 1].nome} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {autores.map((autor) => (
                  <MenuItem value={autor.id} key={autor.id}>
                    {autor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de lançamento"
                value={livro.data_lancamento}
                onChange={(newValue) => {
                  setLivro({ ...livro, data_lancamento: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <TextField
                label="ISBN"
                value={livro.isbn}
                onChange={(e) => {
                  setLivro({ ...livro, isbn: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <FormControl fullWidth>
              <TextField
                label="N.º páginas"
                value={livro.num_paginas}
                onChange={(e) => {
                  setLivro({ ...livro, num_paginas: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Tooltip title="máximo de 1000 caracteres">
                <TextField
                  label="Sinopse"
                  value={livro.sinopse}
                  onChange={(e) => {
                    setLivro({ ...livro, sinopse: e.target.value });
                  }}
                  style={{ backgroundColor: "white" }}
                  type="text"
                  required
                  inputProps={{ maxLength: 1000 }}
                />
              </Tooltip>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <TextField
                label="Edição"
                value={livro.edicao}
                onChange={(e) => {
                  setLivro({ ...livro, edicao: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                value={undefined}
                onChange={(e) => {
                  let file = e.target.files[0];
                  getBase64(file).then((data) =>
                    setLivro({ ...livro, imagem_capa: data })
                  );
                }}
              />
              <Button variant="contained" component="span">
                Carregar imagem da capa
              </Button>
            </label>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="filled-adornment-amount">Preço</InputLabel>
            <FormControl variant="outlined">
              <FilledInput
                id="filled-adornment-amount"
                value={livro.preco}
                onChange={(e) => {
                  setLivro({ ...livro, preco: e.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                style={{ backgroundColor: "white" }}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              size="large"
              variant="contained"
              color="primary"
              className="form__custom-button"
              onClick={gravar}
              sx={{ m: 1 }}
            >
              Gravar
              <input type="Submit" hidden></input>
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider>
  );
}
