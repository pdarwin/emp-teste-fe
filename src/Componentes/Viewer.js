import { Button, Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import { actions } from "./ModalReducer";
import { useCustomContext } from "./CustomContext";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const API_URL = "http://localhost:8080";

export default function Viewer({ type }) {
  const [data, setData] = useState(null);
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

  useEffect(() => {
    console.log("tudo", data);
    setData(null);
    getData();
  }, []);

  useEffect(() => {
    console.log("data", data);
    if (data === null) {
      getData();
    }
  }, [data]);

  const navigate = useNavigate();

  const params = useParams();

  let getType;
  if (type === "Empresas") {
    getType = "Empresas";
  } else if (type === "Pessoas") {
    getType = "PessoasByEmpresa/" + params.id;
  } else if (type === "Salarios") {
    getType = "SalariosByPessoa/" + params.id;
  }

  let postType;
  if (type === "Empresas") {
    postType = "Empresa";
  } else if (type === "Pessoas") {
    postType = "Pessoa/" + params.id;
  } else if (type === "Salarios") {
    postType = "Salario/" + params.id;
  }

  let columns;
  if (type === "Empresas") {
    columns = [
      { field: "nome", headerName: "Nome", width: 250 },
      { field: "morada", headerName: "Morada", width: 650 },
      { field: "imagem", headerName: "Imagem", width: 650 },
    ];
  } else if (type === "Pessoas") {
    columns = [
      { field: "nome", headerName: "Nome", width: 250 },
      { field: "idade", headerName: "Idade", width: 650 },
      { field: "email", headerName: "Email", width: 650 },
      { field: "imagem", headerName: "Imagem", width: 650 },
    ];
  } else if (type === "Salarios") {
    columns = [
      { field: "quantidade", headerName: "Quantidade", width: 250 },
      { field: "data", headerName: "Data", width: 650 },
    ];
  }

  function getData() {
    console.log(getType);
    fetch(API_URL + "/get" + getType, {
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
        console.log(parsedResponse);
        setData(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function gravar() {
    //if (valida()) {
    fetch(API_URL + "/add" + postType, {
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
      <Typography variant="h5" my={3} align="center">
        {"Gestão de " + type}
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        {data !== null ? (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={(params) => {
              if (type === "Empresas") {
                setData(null);
                navigate("/pessoasporempresa/" + params.row.id);
              }
              if (type === "Pessoas") {
                setData(null);
                navigate("/salariosporpessoa/" + params.row.id);
              }
            }}
          />
        ) : (
          ""
        )}
      </div>
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
              label="Quantidade"
              value={item.quantidade}
              onChange={(e) => {
                setItem({ ...item, quantidade: e.target.value });
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
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              setData(null);
              navigate(-1);
            }}
            size="small"
            style={{ float: "right" }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
