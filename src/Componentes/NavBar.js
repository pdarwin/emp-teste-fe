import { useNavigate } from "react-router-dom";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

export default function NavBar() {
  const navigate = useNavigate();

  return (
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
              style={{ color: "white" }}
            >
              <Avatar
                alt="Empresas Requalificar"
                src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
                sx={{ p: 1 }}
              />
              Empresas Requalificar
            </IconButton>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
