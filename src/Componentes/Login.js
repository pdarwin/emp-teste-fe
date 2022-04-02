import { ThemeProvider } from "@emotion/react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ theme, setUser, modalControls, API_URL }) {
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    staff: false,
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const doLogin = () => {
    if (validar()) {
      fetch(API_URL + "/loginCliente", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: newUser.email,
          password: password,
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
              id: parsedResponse.newID,
              username: newUser.email,
              staff: newUser.staff,
            });
            modalControls.setErr("Login bem sucedido");
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
  };
  function validar() {
    modalControls.setErrLevel("error");
    if (newUser.email === "") {
      modalControls.setErr("Email não preenchido");
      modalControls.handleOpen();
      return false;
    }
    if (password === "") {
      modalControls.setErr("Password não preenchida");
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
            <Typography variant="h5">Entrar na aplicação</Typography>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <TextField
                label="Email ou username"
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
          <Grid item xs={7}>
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
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={doLogin}
              sx={{ m: 1 }}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                navigate("/registo");
              }}
              sx={{ m: 1 }}
            >
              Fazer registo
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
