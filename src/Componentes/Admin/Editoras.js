import { ThemeProvider } from "@emotion/react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "morada", headerName: "Morada", width: 650 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 150,
  },
];

export default function Editoras({ theme, modalControls, API_URL }) {
  const [editoras, setEditoras] = React.useState([]);
  const [editora, setEditora] = React.useState({
    nome: "",
    morada: "",
  });

  React.useEffect(() => {
    getEditoras();
  }, []);

  const navigate = useNavigate();

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
      fetch(API_URL + "/addEditora", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: editora.nome,
          morada: editora.morada,
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
            editora.id = parsedResponse.newID;
            editora.ativo = true;
            setEditoras([...editoras, editora]);
            setEditora({ ...editora, nome: "", morada: "" });
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
    if (editora.nome === "") {
      modalControls.setErr("Nome não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (editora.morada === "") {
      modalControls.setErr("Morada não preenchida");
      modalControls.handleOpen();
      return false;
    }
    return true;
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" my={3} align="center" color="primary">
        Gestão de editoras
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={editoras}
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
            <Typography variant="h5">Registo de editora</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              value={editora.nome}
              onChange={(e) => {
                setEditora({ ...editora, nome: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Morada"
              value={editora.morada}
              onChange={(e) => {
                setEditora({ ...editora, morada: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
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
