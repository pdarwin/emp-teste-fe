import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "data_nascimento", headerName: "Data de nascimento", width: 200 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 5,
  },
];

export default function Autores({ theme, modalControls, API_URL }) {
  const [autores, setAutores] = React.useState([]);
  const [editoras, setEditoras] = React.useState([]);
  const [autor, setAutor] = React.useState({
    nome: "",
    email: "",
    data_nascimento: null,
    editora_id: "",
  });

  //regexp de validação do email
  const validEmail = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

  React.useEffect(() => {
    getAutores();
    getEditoras();
  }, []);

  const navigate = useNavigate();

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

  function getEditoras() {
    fetch(API_URL + "/getEditoras", {
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
        setEditoras(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    if (valida()) {
      fetch(API_URL + "/addAutor/" + autor.editora_id, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: autor.nome,
          email: autor.email,
          data_nascimento: autor.data_nascimento,
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
            autor.id = parsedResponse.newID;
            autor.ativo = true;
            setAutores([...autores, autor]);
            setAutor({
              ...autor,
              nome: "",
              email: "",
              data_nascimento: null,
              editora_id: "",
            });
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

  function valida() {
    modalControls.setErrLevel("error");
    if (autor.nome === "") {
      modalControls.setErr("Nome não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (autor.email === "") {
      modalControls.setErr("Email não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (!validEmail.test(autor.email)) {
      modalControls.setErr("Email inválido");
      modalControls.handleOpen();
      return false;
    }
    if (autor.data_nascimento === null) {
      modalControls.setErr("Data de nascimento não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (autor.editora_id === "") {
      modalControls.setErr("Associe uma editora ao autor");
      modalControls.handleOpen();
      return false;
    }
    return true;
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" my={3} align="center" color="primary">
        Gestão de autores
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={autores}
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
            <Typography variant="h5">Registo de autor</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Nome"
              value={autor.nome}
              onChange={(e) => {
                setAutor({ ...autor, nome: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de nascimento"
                value={autor.data_nascimento}
                onChange={(newValue) => {
                  setAutor({ ...autor, data_nascimento: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={autor.email}
              onChange={(e) => {
                setAutor({ ...autor, email: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="editora">Editora</InputLabel>
              <Select
                labelId="editora"
                id="editora"
                value={autor.editora_id}
                label="Editora"
                onChange={(e) => {
                  setAutor({ ...autor, editora_id: e.target.value });
                }}
              >
                {editoras.map((editora) => (
                  <MenuItem value={editora.id} key={editora.id}>
                    {editora.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
