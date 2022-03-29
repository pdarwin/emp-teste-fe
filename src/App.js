import "./App.css";
// import { Contador } from "./Componentes/Contador/Contador";
// import { Layout } from "./StatelessExercicio1/Layout";
// import { ToDo } from "./Componentes/ToDoList/ToDo";
import { Header } from "./Componentes/Header/Header";
// import { Table } from "./Componentes/Table/Table";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Componentes/HomePage";
import { Editoras } from "./Componentes/Editoras/Editoras";
// import { Contacts } from "./Componentes/Contacts";
// import { Menu } from "./Componentes/Menu";
import NavBar from "./Componentes/NavBar/NavBar";
import { useState } from "react";
import { UserBar } from "./Componentes/UserBar/UserBar";
import { ThemeProvider, createTheme } from "@mui/material";

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
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar theme={myTheme} />
        <Routes>
          <Route path="/" exact component={<HomePage />}></Route>
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
