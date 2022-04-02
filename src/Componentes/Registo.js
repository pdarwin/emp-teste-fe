import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export function Registo({ theme, setUser, modalControls, API_URL }) {
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    morada: "",
    data_nascimento: null,
    ativo: true,
    staff: false,
  });
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //regexp de validação do email
  const validEmail = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
  //regexp para password com pelo menso 1 maiúscula, 1 minúscula, 1 dígito, entre 8 e 20 caracteres
  const validPassword = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$");

  const navigate = useNavigate();

  function registar() {
    if (validar()) {
      fetch(API_URL + "/addCliente", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome: newUser.nome,
          data_nascimento: newUser.data_nascimento,
          email: newUser.email,
          morada: newUser.morada,
          password: password,
          ativo: true,
        }),
      })
        .then((response) => {
          // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
          console.log(response);

          return response.json();
        })
        .then((parsedResponse) => {
          if (parsedResponse.statusOK) {
            setUser({
              nome: newUser.nome,
              username: newUser.email,
              staff: newUser.staff,
            });
            modalControls.setErr("Registo efetuado com sucesso");
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

  function validar() {
    modalControls.setErrLevel("error");
    if (newUser.nome === "") {
      modalControls.setErr("Nome não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (newUser.email === "") {
      modalControls.setErr("Email não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (!validEmail.test(newUser.email)) {
      modalControls.setErr("Email inválido");
      modalControls.handleOpen();
      return false;
    }
    if (newUser.morada === "") {
      modalControls.setErr("Morada não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (password === "") {
      modalControls.setErr("Password não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (newUser.data_nascimento === null) {
      modalControls.setErr("Data de nascimento não preenchida");
      modalControls.handleOpen();
      return false;
    }
    if (password !== password2) {
      modalControls.setErr("As passwords não coincidem");
      modalControls.handleOpen();
      return false;
    }
    if (!validPassword.test(password)) {
      modalControls.setErr(
        "A password tem de conter pelo menos uma letra minúscula, uma maiúscula, um dígito, e 8 a 20 caracteres"
      );
      modalControls.handleOpen();
      return false;
    }
    return true;
  }

  return (
    <form className="form">
      <ThemeProvider theme={theme}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ backgroundColor: indigo[100], p: 8 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Registo de utilizador</Typography>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <TextField
                label="Nome"
                value={newUser.nome}
                onChange={(e) => {
                  setNewUser({ ...newUser, nome: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de nascimento"
                value={newUser.data_nascimento}
                onChange={(newValue) => {
                  setNewUser({ ...newUser, data_nascimento: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tipo de utilizador
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={newUser.staff}
                name="radio-buttons-group"
                onChange={(e) => {
                  setNewUser({ ...newUser, staff: e.target.value });
                }}
                value={newUser.staff}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Cliente"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Funcionário"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <TextField
                label="Email"
                value={newUser.email}
                onChange={(e) => {
                  setNewUser({ ...newUser, email: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <TextField
                label="Morada"
                value={newUser.morada}
                onChange={(e) => {
                  setNewUser({ ...newUser, morada: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <TextField
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ backgroundColor: "white" }}
                type="password"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <TextField
                label="Confirme a password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                style={{ backgroundColor: "white" }}
                type="password"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              className="form__custom-button"
              size="small"
              onClick={registar}
              sx={{ m: 1 }}
            >
              Registar
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                navigate(-1);
              }}
              sx={{ m: 1 }}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
