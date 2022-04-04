import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
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
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "titulo", headerName: "Título", width: 200 },
  { field: "sinopse", headerName: "Sinopse", width: 200 },
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

export default function Livros({ theme, modalControls, API_URL }) {
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
    stock: 0,
    autores: [],
  });

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

  const navigate = useNavigate();

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
          stock: livro.stock,
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
              stock: 0,
              autores: [],
            });
            setSelAutores([]);
            modalControls.setErr("Registo bem sucedido");
            modalControls.setErrLevel("success");
            modalControls.handleOpen();
          } else {
            modalControls.setErr(parsedResponse.msg);
            modalControls.setErrLevel("error");
            modalControls.handleOpen();
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
    modalControls.setErrLevel("error");
    if (livro.titulo === "") {
      modalControls.setErr("Título não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (livro.isbn === "") {
      modalControls.setErr("ISBN não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (livro.sinopse === "") {
      modalControls.setErr("Sinopse não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (livro.edicao === "") {
      modalControls.setErr("Edição não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (livro.imagem_capa === "") {
      modalControls.setErr("É necessário escolher uma imagem de capa");
      modalControls.handleOpen();
      return false;
    }
    if (livro.data_lancamento === null) {
      modalControls.setErr("Data de lançamento não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (livro.num_paginas <= 0) {
      modalControls.setErr("O número de páginas tem de ser maior que zero");
      modalControls.handleOpen();
      return false;
    }
    if (livro.preco <= 0) {
      modalControls.setErr("O preço tem de ser maior que zero");
      modalControls.handleOpen();
      return false;
    }
    if (livro.stock < 0) {
      modalControls.setErr("O stock não pode ser menor que zero");
      modalControls.handleOpen();
      return false;
    }
    if (selAutores.length === 0) {
      modalControls.setErr("Associe pelo menos um autor");
      modalControls.handleOpen();
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
          </Grid>
          <Grid item xs={3}>
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
            <img src={livro.imagem_capa} loading="lazy" height={100} />
          </Grid>
          <Grid item xs={1}>
            <FormControl fullWidth>
              <TextField
                label="Stock"
                value={livro.stock}
                onChange={(e) => {
                  setLivro({ ...livro, stock: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="filled-adornment-amount"
              value={livro.preco}
              onChange={(e) => {
                setLivro({ ...livro, preco: e.target.value });
              }}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              style={{ backgroundColor: "white" }}
              type="number"
              label="Preço"
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={2}>
            <Button
              type="button"
              size="small"
              variant="contained"
              color="primary"
              className="form__custom-button"
              onClick={gravar}
            >
              Gravar
              <input type="Submit" hidden></input>
            </Button>
          </Grid>
          <Grid item xs={1}>
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
      </form>
    </ThemeProvider>
  );
}
