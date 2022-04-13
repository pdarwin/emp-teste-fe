import { Button, Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { indigo } from "@mui/material/colors";
import { actions } from "./ModalReducer";
import { useCustomContext } from "./CustomContext";

const columns = [
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "morada", headerName: "Morada", width: 650 },
  { field: "imagem", headerName: "Imagem", width: 650 },
];

const API_URL = "http://localhost:8080";

export default function Viewer({ type }) {
  const [data, setData] = useState();
  const [item, setItem] = useState({ nome: "", morada: "", image: "" });
  const { modalState, modalDispatch } = useCustomContext();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const navigate = useNavigate();

  function getData() {
    console.log("teste");
    fetch(API_URL + "/get" + type, {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        setData(parsedResponse);
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    //if (valida()) {
    fetch(API_URL + "/addEmpresa", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.status.toString);
        }

        return response.json();
      })
      .then((parsedResponse) => {
        if (parsedResponse.statusOk) {
          item.id = parsedResponse.newID;
          setData([...data, item]);
          setItem({ ...item, nome: "", morada: "", imagem: "" });
          modalDispatch({
            type: actions.fireModal,
            payload: {
              msg: "Registo bem sucedido",
              level: "success",
            },
          });
        } else {
          modalDispatch({
            type: actions.fireModal,
            payload: {
              msg: parsedResponse.msg,
              level: "error",
            },
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  /* function valida() {
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
 */
  return (
    <>
      <Typography variant="h5" my={3} align="center">
        {"Gestão de " + type}
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        {data !== undefined ? (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          ""
        )}
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: indigo[100], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">{"Registo de " + type}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            value={item.nome}
            onChange={(e) => {
              setItem({ ...item, nome: e.target.value });
            }}
            style={{ backgroundColor: "white" }}
            type="text"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Morada"
            value={item.morada}
            onChange={(e) => {
              setItem({ ...item, morada: e.target.value });
            }}
            style={{ backgroundColor: "white" }}
            type="text"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Imagem"
            value={item.imagem}
            onChange={(e) => {
              setItem({ ...item, imagem: e.target.value });
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
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
            size="small"
            style={{ float: "right" }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
