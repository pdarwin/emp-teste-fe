import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { actions } from "./ModalReducer";
import { useCustomContext } from "./CustomContext";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import config from "../Config.json";

export default function MyForm({ type, getData }) {
  const [item, setItem] = useState({
    nome: "",
    morada: "",
    imagem: "",
    email: "",
    idade: 0,
    data: null,
    quantidade: 0,
  });
  const { modalState, modalDispatch } = useCustomContext();

  const params = useParams();

  let postType;
  if (type === "Empresas") {
    postType = "Empresa";
  } else if (type === "Pessoas") {
    postType = "Pessoa/" + params.id;
  } else if (type === "Salarios") {
    postType = "Salario/" + params.id;
  }

  function gravar() {
    //if (valida()) {
    fetch(config.API_URL + "/add" + postType, {
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
          getData();
          setItem({
            ...item,
            nome: "",
            morada: "",
            imagem: "",
            email: "",
            idade: 0,
            data: null,
            quantidade: 0,
          });
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
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{ backgroundColor: blue[200], p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">{"Registo de " + type}</Typography>
        </Grid>
        {type === "Empresas" || type === "Pessoas" ? (
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
        ) : (
          ""
        )}
        {type === "Empresas" ? (
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
        ) : (
          ""
        )}
        {type === "Pessoas" ? (
          <Grid item xs={12}>
            <TextField
              label="Idade"
              value={item.idade}
              onChange={(e) => {
                setItem({ ...item, idade: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Pessoas" ? (
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={item.email}
              onChange={(e) => {
                setItem({ ...item, email: e.target.value });
              }}
              style={{ backgroundColor: "white" }}
              type="text"
              required
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Empresas" || type === "Pessoas" ? (
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
        ) : (
          ""
        )}
        {type === "Salarios" ? (
          <Grid item xs={12}>
            <TextField
              id="filled-adornment-amount"
              value={item.quantidade}
              onChange={(e) => {
                setItem({ ...item, quantidade: e.target.value });
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
              label="Quantidade"
            />
          </Grid>
        ) : (
          ""
        )}
        {type === "Salarios" ? (
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data"
                value={item.data}
                onChange={(newValue) => {
                  setItem({ ...item, data: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={8}>
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
      </Grid>
    </div>
  );
}
