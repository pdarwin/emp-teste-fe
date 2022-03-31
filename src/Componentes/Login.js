import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ theme, user, setUser, API_URL }) {
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    staff: false,
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Gestão do modal
  const [open, setOpen] = React.useState(false);
  const [errLevel, setErrLevel] = React.useState("error");
  const [err, setErr] = React.useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const logar = () => {
    if (validar()) {
      fetch(API_URL + "/validateCliente", {
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
          if (response.status !== 200) {
            throw new Error(response.status);
          }

          return response.json();
        })
        .then((parsedResponse) => {
          setUser({
            ...user,
            username: newUser.email,
            nome: newUser.nome,
            staff: newUser.staff,
          });
          setErr("Login bem sucedido");
          setErrLevel("success");
          handleOpen();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  function validar() {
    if (newUser.email === "") {
      setErr("Email não preenchido");
      handleOpen();
      return false;
    }
    if (password === "") {
      setErr("Password não preenchida");
      handleOpen();
      return false;
    }

    return true;
  }

  return (
    <form className="form">
      <ThemeProvider theme={theme}>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            onClick={() => {
              if (errLevel === "success") navigate("/");
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Alert severity={errLevel}>{err}</Alert>
          </Modal>
        </div>
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
          <Grid item xs={12}>
            <Button
              type="button"
              size="large"
              variant="contained"
              color="primary"
              className="form__custom-button"
              onClick={logar}
              sx={{ m: 1 }}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" my={6}>
              Se ainda não está registado, pode fazer{" "}
              <Link href="/registo">aqui</Link> o seu registo.
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
