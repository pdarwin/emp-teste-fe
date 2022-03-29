import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loja } from "./Componentes/Loja/Loja";
import Login from "./Componentes/Login";
import { Editoras } from "./Componentes/Admin/Editoras";
import { Autores } from "./Componentes/Admin/Autores";
import NavBar from "./Componentes/NavBar";
import { useState } from "react";
import { createTheme } from "@mui/material";

function App() {
  const [user, setUser] = useState();

  const myTheme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ce822c",
        main: "#ce822c",
        dark: "#ce822c",
        contrastText: "#000",
      },
    },
  });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar theme={myTheme} user={user} />
        <Routes>
          <Route path="/" element={<Loja theme={myTheme} />}></Route>
          <Route path="/contactos"></Route>
          <Route path="/login" element={<Login theme={myTheme} />}></Route>
          <Route path="/livros" element={<Autores theme={myTheme} />}></Route>
          <Route path="/autores"></Route>
          <Route
            path="/editoras"
            element={<Editoras theme={myTheme} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/*      <Header />
      <BrowserRouter>
        {user && <NavBar value={user} />}
        <Routes>
          <Route
            path="/home"
            element={
              <VerificaUser user={user}>
                <HomePage />
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/contacts/:id"
            element={
              <VerificaUser user={user}>
                <Contacts />
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/menu"
            element={
              <VerificaUser user={user}>
                <Menu />
              </VerificaUser>
            }
          ></Route>
          <Route path="/*" element={<UserBar doLogin={setUser} />}></Route>
        </Routes>
      </BrowserRouter>
      <Table /> */}
    </div>
  );
}

function VerificaUser({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
