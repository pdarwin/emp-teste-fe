import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@emotion/react";

const columns = [
  { field: "nome", headerName: "Nome", width: 167 },
  { field: "morada", headerName: "Morada", width: 527, editable: true },
  { field: "ativo", headerName: "Estado", width: 221 },
  {
    field: "ativo",
    headerName: "Ativo",
    type: "boolean",
    width: 10,
    editable: true,
  },
  ,
];

function Formulário() {
  if (validar()) {
    fetch(API_URL + "/addEditora", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nome: newUser.nome,
        morada: newUser.morada,
        ativo: true,
      }),
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
        setUser({
          ...user,
          nome: newUser.nome,
          morada: newUser.morada,
        });
        setErr("Formulário bem sucedido.");
        setErrLevel("success");
        handleOpen();
      })
      .catch((error) => {
        alert(error);
      });
  
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
            <Typography variant="h5">Adicionar uma Editora</Typography>
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

      </ThemeProvider>
    </form>
  )

export default function Editoras({ theme, API_URL }) {
  const [editoras, setEditoras] = React.useState([]);

  React.useEffect(() => {
    getEditoras();
  }, []);

  function getEditoras() {
    console.log(API_URL + "/getEditoras");
    fetch(API_URL + "/getEditoras", {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding editoras!");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setEditoras(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={editoras}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
