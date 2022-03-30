import Button from "@mui/material/Button";

import DataTable from "./DataTable";

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function Editoras(props) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [nome, setNome] = useState("");
  const [morada, setMorada] = useState("");
  const [getEditoras, setEditoras] = useState([]);
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    const editora = { nome, morada };
    console.log(editora);
    fetch("http://localhost:8080/addEditora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editora),
    }).then(() => {
      console.log("Nova Editora Adicionada");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/getEditoras")
      .then((res) => res.json())
      .then((result) => {
        setEditoras(result);
      });
  }, []);

  return (
    <ThemeProvider theme={props.theme}>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}>
            <u>Adicionar Editora</u>
          </h1>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Nome de Editora"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Morada"
              variant="outlined"
              fullWidth
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Submeter
            </Button>
          </form>
        </Paper>
        <h1>Editoras</h1>

        <Paper elevation={3} style={paperStyle}>
          {getEditoras.map((editora) => (
            <Paper
              elevation={6}
              style={{
                margin: "10px",
                padding: "15px",
                textAlign: "center",
                lineBreak: "normal",
              }}
              key={editora.id}
            >
              Id:{editora.id}
              <br />
              Nome:{editora.nome}
              <br />
              Morada:{editora.morada}
            </Paper>
          ))}
        </Paper>
        <DataTable />
      </Container>
    </ThemeProvider>
  );
}
