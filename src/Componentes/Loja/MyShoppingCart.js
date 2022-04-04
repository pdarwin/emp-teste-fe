import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Badge, Grid, MenuItem, Paper, Popover, Select } from "@mui/material";
import { Add, Discount, Remove, ShoppingCart } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import { indigo } from "@mui/material/colors";

export default function MyShoppingCart({
  user,
  setUser,
  shoppingCart,
  cartControls,
  modalControls,
  API_URL,
}) {
  const [livros, setLivros] = React.useState([]);
  const [cupoes, setCupoes] = React.useState(null);
  const [cupao, setCupao] = React.useState(null);

  //Gestão do popover
  const [anchor, setAnchor] = React.useState(null);

  function calculateSum() {
    let total = 0.0;
    if (!shoppingCart) {
      return total;
    }
    for (let element of shoppingCart) {
      let value = element.quantity * element.item.preco;
      total += value;
    }

    return Math.round(total * 100) / 100;
  }

  function pagar() {
    // Ciclo para preencher os livros da compra
    setLivros(...livros, []);
    shoppingCart.map((element) => {
      livros.push({
        id: parseInt(element.item.id),
        titulo: element.item.titulo,
        stock: parseInt(element.quantity),
      });
    });

    //calcula o total sem sesconto desconto
    let total = calculateSum();

    //Verificação de cupões
    if (cupao != null) {
      cupoes.map((c) => {
        if (c.id == cupao.id) {
          cupao.desconto = c.desconto;
        }
      });

      setCupoes(null);

      //aplica o desconto
      total = total - (total * cupao.desconto) / 100;
    }

    fetch(API_URL + "/addCompra/" + user.id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        valor: total,
        livros: livros,
      }),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        /*           if (response.status !== 200) {
        throw new Error(response.status.toString);
      } */

        return response.json();
      })
      .then((parsedResponse) => {
        if (parsedResponse.statusOk) {
          if (cupao != null) {
            remCupao();
            setCupao(null);
          }
          setCupoes(null);
          modalControls.setErr("");
          modalControls.setErr(
            "Compra no valor de " +
              total +
              "€ efetuada com sucesso." +
              (total >= 50
                ? "Ganhou um cupão de " +
                  (total < 100 ? 5 : 15) +
                  "% de desconto"
                : "")
          );
          modalControls.setErrLevel("success");
          modalControls.handleOpen();
          setUser({ ...user, shoppingCart: [] });
          setAnchor(false);
        } else {
          console.log(parsedResponse);
          modalControls.setErr(parsedResponse.msg);
          modalControls.setErrLevel("error");
          modalControls.handleOpen();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getCupoes() {
    fetch(API_URL + "/getCupoesByClienteId/" + user.id, {
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("Erro:" + response.status);
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setCupoes(parsedResponse.lista);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function remCupao() {
    fetch(API_URL + "/remCupao/" + cupao.id, {
      method: "PUT",
    });
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="shopping-cart"
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        <Badge color="secondary" badgeContent={shoppingCart.length} showZero>
          <Tooltip title="Carrinho de compras">
            <ShoppingCart />
          </Tooltip>
        </Badge>
      </IconButton>
      <Popover
        id={"simple-popover"}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => {
          setAnchor(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "20em",
            height: "20em",
            overflowY: "scroll",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {shoppingCart.map((e, i) => {
            return (
              <Paper
                key={i}
                elevation={2}
                sx={{
                  width: "18em",
                  height: "5em",
                  padding: "0.125em",
                  boxSizing: "border-box",
                  marginY: "0.250em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography variant="p">Título: {e.item.titulo}</Typography>
                  <Typography variant="p">Quantidade: {e.quantity}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <IconButton
                    color="success"
                    onClick={() => {
                      cartControls.increaseQuantity(e.item);
                    }}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      cartControls.decreaseQuantity(e.item);
                    }}
                  >
                    <Remove />
                  </IconButton>
                </Box>
              </Paper>
            );
          })}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="body1" mx={1}>
              Total = {calculateSum()}€
            </Typography>
          </Box>
          <Grid container>
            {cupoes == null ? (
              <Grid item sx={12}>
                <IconButton
                  onClick={() => {
                    getCupoes();
                  }}
                >
                  <Typography variant="body1">
                    Ver cupões disponíveis
                  </Typography>
                  <Discount />
                </IconButton>
              </Grid>
            ) : (
              ""
            )}
            {cupoes != null ? (
              cupoes.length > 0 ? (
                <Grid item sx={12}>
                  <Typography variant="body1">
                    Existem cupões disponíveis. Escolha o cupão que deseja usar
                  </Typography>
                  <Select
                    labelId="cupoes"
                    id="cupoes"
                    value={cupao == null ? "" : cupao.id}
                    label="Cupões"
                    onChange={(e) => {
                      setCupao({ ...cupao, id: e.target.value });
                    }}
                  >
                    {cupoes.map((cupao) => (
                      <MenuItem value={cupao.id} key={cupao.id}>
                        {cupao.desconto}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              ) : (
                "Não existem cupões disponíveis"
              )
            ) : (
              ""
            )}
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Tooltip title="Pagar">
              <IconButton
                onClick={() => {
                  pagar();
                }}
              >
                <Typography variant="body1" mx={1}>
                  Pagar
                </Typography>
                <PaymentIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
