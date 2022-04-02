import { useNavigate } from "react-router-dom";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Alert,
  Badge,
  Modal,
  Paper,
  Popover,
  ThemeProvider,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import { indigo } from "@mui/material/colors";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";

const pages = [
  { name: "Loja", link: "/" },
  { name: "Contactos", link: "/contactos" },
];

const menuadmin = [
  { name: "Gestão de livros", link: "/livros" },
  { name: "Gestão de autores", link: "/autores" },
  { name: "Gestão de editoras", link: "/editoras" },
  { name: "Gestão de clientes", link: "/clientes" },
  { name: "Gestão de funcionários", link: "/staff" },
];

function NavBar({ theme, user, setUser, shoppingCart, cartControls, API_URL }) {
  const [anchor, setAnchor] = React.useState(null);

  const navigate = useNavigate();

  //Gestão do modal
  const [open, setOpen] = React.useState(false);
  const [errLevel, setErrLevel] = React.useState("error");
  const [err, setErr] = React.useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

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
    const total = calculateSum();

    fetch(API_URL + "/addCompra/" + user.id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        valor: total,
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
          setErr(
            "Compra no valor de " +
              total +
              "€ efetuada com sucesso." +
              (total >= 50
                ? "Ganhou um cupão de " +
                  (total < 100 ? 5 : 15) +
                  "% de desconto"
                : "")
          );
          setErrLevel("success");
          handleOpen();
          shoppingCart = null;
        } else {
          setErr(parsedResponse.msg);
          setErrLevel("error");
          handleOpen();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="Livraria Requalificar"
                  src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
                />
              </IconButton>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => {
                    navigate(page.link);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="" {...bindTrigger(popupState)}>
                      Administração
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {menuadmin.map((page) => (
                        <MenuItem
                          key={page.name}
                          onClick={() => {
                            navigate(page.link);
                          }}
                        >
                          {page.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
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
                <Badge
                  color="secondary"
                  badgeContent={shoppingCart.length}
                  showZero
                >
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
                          <Typography variant="p">
                            Título: {e.item.titulo}
                          </Typography>
                          <Typography variant="p">
                            Quantidade: {e.quantity}
                          </Typography>
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
                    <Tooltip title="Pagar">
                      <IconButton
                        onClick={() => {
                          pagar();
                        }}
                      >
                        <Typography variant="body1" mx={1}>
                          Total = {calculateSum()}€
                        </Typography>
                        <PaymentIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Popover>
            </Box>
            <Box sx={{ flexGrow: 0, mx: 2 }}>
              {user.username === "" ? (
                <Tooltip title="Entrar">
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    sx={{ p: 0, color: indigo[100] }}
                  >
                    Entrar
                  </Button>
                </Tooltip>
              ) : (
                <Typography>
                  {user.username}
                  <Tooltip title="Sair da aplicação">
                    <Button
                      onClick={() => {
                        setUser({
                          ...user,
                          nome: "",
                          username: "",
                          staff: false,
                        });
                        navigate("/");
                      }}
                      sx={{ p: 0, color: indigo[100] }}
                    >
                      Sair
                    </Button>
                  </Tooltip>
                </Typography>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Alert severity={errLevel}>{err}</Alert>
      </Modal>
    </ThemeProvider>
  );
}
export default NavBar;
