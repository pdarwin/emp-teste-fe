import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Registo({ theme, user, setUser, API_URL }) {
  const [tipo, setTipo] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  function registar() {
    //if (novaPessoa.nome.trim().length !== 0 && novaPessoa.idade > 0) {
    fetch(API_URL + "/regCliente", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ nome: user.nome, email: user.email }),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        return <Alert severity="success">Registo efetuado com sucesso</Alert>;
      })
      .catch((error) => {
        alert(error);
      });
    //}
  }

  return (
    <form className="form">
      <ThemeProvider theme={theme}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ backgroundColor: indigo[100], p: 3 }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Registo de utilizador</Typography>
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <TextField
                label="Nome"
                value={user.nome}
                onChange={(e) => {
                  setUser({ ...user, nome: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tipo de utilizador
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="cliente"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="cliente"
                  control={<Radio />}
                  label="Cliente"
                  onChange={(e) => {
                    setTipo(e.target.value);
                  }}
                />
                <FormControlLabel
                  value="staff"
                  control={<Radio />}
                  label="Funcionário"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <TextField
                label="Email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <TextField
                label="Morada"
                value={user.morada}
                onChange={(e) => {
                  setUser({ ...user, morada: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <TextField
                label="Password"
                //value={password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <TextField
                label="Confirme a password"
                //value={password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                style={{ backgroundColor: "white" }}
                type="password"
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
              onClick={registar}
              sx={{ m: 1 }}
            >
              Registar
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
