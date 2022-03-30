import { ThemeProvider } from "@emotion/react";
import {
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

export function Registo({ theme, user, setUser }) {
  const [tipo, setTipo] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const logIn = () => {
    //if (user === "David" && password === "123456") {
    navigate("/loja");
    //props.doLogin({ name: "David" });
    //}
  };

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
                value={user}
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
                value={user}
                onChange={(e) => {
                  setUser({ ...user, nome: e.target.value });
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
              onClick={logIn}
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
