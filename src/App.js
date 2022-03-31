import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loja from "./Componentes/Loja/Loja";
import { Login } from "./Componentes/Login";
import Editoras from "./Componentes/Admin/Editoras";
import { Autores } from "./Componentes/Admin/Autores";
import NavBar from "./Componentes/NavBar";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import { Registo } from "./Componentes/Registo";
import Clientes from "./Componentes/Admin/Clientes";

function App() {
  const [user, setUser] = useState({
    nome: "",
    username: "",
    staff: false,
  });

  const API_URL = "http://localhost:8080";

  const myTheme = createTheme({
    palette: {
      primary: indigo,
      secondary: orange,
    },
  });

  useEffect(() => {
    document.title = "Livraria Requalificar";
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar theme={myTheme} user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Loja
                theme={myTheme}
                user={user}
                setUser={setUser}
                API_URL={API_URL}
              />
            }
          ></Route>
          <Route path="/contactos"></Route>
          <Route
            path="/login"
            element={
              <Login
                theme={myTheme}
                user={user}
                setUser={setUser}
                API_URL={API_URL}
              />
            }
          ></Route>
          <Route
            path="/registo"
            element={
              <Registo theme={myTheme} setUser={setUser} API_URL={API_URL} />
            }
          ></Route>
          <Route path="/livros" element={<Autores theme={myTheme} />}></Route>
          <Route path="/autores"></Route>
          <Route
            path="/editoras"
            element={<Editoras theme={myTheme} API_URL={API_URL} />}
          ></Route>
          <Route
            path="/clientes"
            element={<Clientes theme={myTheme} API_URL={API_URL} />}
          ></Route>
          <Route path="/staff"></Route>
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
