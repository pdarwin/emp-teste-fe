import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";

function Login(props) {
  return (
    <ThemeProvider theme={props.theme}>
      <Button>Login</Button>
    </ThemeProvider>
  );
}

export default Login;
