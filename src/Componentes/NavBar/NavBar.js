//import "./NavBar.css";
//import "../../App.css";
import { useNavigate } from "react-router-dom";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const pages = [
  { nome: "Entrada", link: "/" },
  { nome: "Editoras", link: "/editoras" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const navigate = useNavigate();

  /* const [anchorElNa  v, setAnchorElNav] =
    (React.useState < null) | (HTMLElement > null);
  const [anchorElUser, setAnchorElUser] =
    (React.useState < null) | (HTMLElement > null); */
  //function handleOpenNavMenu() {}
  //const handleOpenUserMenu = () => {};

  const classes = useStyles();

  /*   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }; */
  /*   const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }; */
  return (
    <ThemeProvider theme={props.theme}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Avatar
                alt="Livraria Requalificar"
                src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg" //
              />
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.nome}
                  onClick={() => {
                    navigate(page.link);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.nome}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton /* onClick={handleOpenUserMenu} */ sx={{ p: 0 }}>
                  <Avatar
                    alt="Carrinho de compras"
                    src="https://static.thenounproject.com/png/1385410-200.png"
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {props.value}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                //anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} /* onClick={handleCloseUserMenu */>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;
