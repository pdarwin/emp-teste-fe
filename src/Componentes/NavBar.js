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
import { ThemeProvider } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import { indigo, orange } from "@mui/material/colors";
import MyShoppingCart from "./Loja/MyShoppingCart";
import { Person, SupervisorAccount } from "@mui/icons-material";

const pages = [
  { name: "Loja", link: "/" },
  { name: "Contactos", link: "/contactos" },
];

const menuAdmin = [
  { name: "Gestão de livros", link: "/livros" },
  { name: "Gestão de autores", link: "/autores" },
  { name: "Gestão de editoras", link: "/editoras" },
  { name: "Gestão de clientes", link: "/clientes" },
  { name: "Gestão de funcionários", link: "/staff" },
];

const menuCliente = [
  { name: "Lista de compras", link: "/compras" },
  { name: "Gestão de cupões", link: "/cupoes" },
  { name: "Preferencias", link: "/settings" },
];

export default function NavBar({
  theme,
  user,
  setUser,
  shoppingCart,
  cartControls,
  modalControls,
  API_URL,
}) {
  const navigate = useNavigate();

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
            </Box>
            {user.staff ? ( // Menu administração
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="" {...bindTrigger(popupState)}>
                      Administração
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {menuAdmin.map((page) => (
                        <MenuItem
                          key={page.name}
                          onClick={() => {
                            popupState.setOpen(!popupState);
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
            ) : (
              ""
            )}

            {user.id != "" && !user.staff ? ( // Menu carrinho de compras
              <MyShoppingCart
                user={user}
                setUser={setUser}
                shoppingCart={shoppingCart}
                cartControls={cartControls}
                modalControls={modalControls}
                API_URL={API_URL}
              />
            ) : (
              ""
            )}
            {user.id === "" || user.username === "" ? ( //Menu utilizador
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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Tooltip
                      title={
                        "Utilizador atual: " +
                        user.username +
                        (user.staff ? " (staff)" : "")
                      }
                    >
                      <IconButton variant="" {...bindTrigger(popupState)}>
                        <Avatar sx={{ bgcolor: orange[500] }}>
                          {user.staff ? (
                            <SupervisorAccount></SupervisorAccount>
                          ) : (
                            <Person></Person>
                          )}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu {...bindMenu(popupState)}>
                      {!user.staff
                        ? menuCliente.map((page) => (
                            <MenuItem
                              key={page.name}
                              onClick={() => {
                                popupState.setOpen(!popupState);
                                navigate(page.link);
                              }}
                            >
                              {page.name}
                            </MenuItem>
                          ))
                        : ""}
                      <Tooltip title="Sair da aplicação">
                        <MenuItem
                          key="sair"
                          onClick={() => {
                            setUser({
                              ...user,
                              id: "",
                              username: "",
                              staff: false,
                              shoppingCart: [],
                            });
                            navigate("/");
                          }}
                        >
                          Sair
                        </MenuItem>
                      </Tooltip>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
