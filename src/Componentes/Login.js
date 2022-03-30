import { ThemeProvider } from "@emotion/react";
import { Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ user, setUser, theme }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = () => {
    if (user === "David" && password === "123456") {
      navigate("/loja");
      //props.doLogin({ name: "David" });
    }
  };

  return (
    <form className="form">
      <ThemeProvider theme={theme}>
        <Typography variant="h5" my={6}>
          Entrar na aplicação
        </Typography>

        <TextField
          label="Email"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          style={{ backgroundColor: "white" }}
          type="text"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ backgroundColor: "white" }}
          type="password"
        />
        <Button
          type="button"
          size="large"
          variant="contained"
          color="secondary"
          className="form__custom-button"
          onClick={logIn}
          sx={{ m: 1 }}
        >
          Entrar
        </Button>
        <Typography variant="h6" my={6}>
          Se ainda não está registado, pode fazer{" "}
          <Link href="/registo">aqui</Link> o seu registo.
        </Typography>
      </ThemeProvider>
    </form>
  );
}
