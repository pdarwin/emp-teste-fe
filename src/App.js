import "./App.css";
import { Contador } from "./Componentes/Contador/Contador";
import { Layout } from "./StatelessExercicio1/Layout";
import { ToDo } from "./Componentes/ToDoList/ToDo";
import { Header } from "./Componentes/Header/Header";
import { Table } from "./Componentes/Table/Table";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Componentes/HomePage";
import { Contacts } from "./Componentes/Contacts";
import { Menu } from "./Componentes/Menu";
import { NavBar } from "./Componentes/NavBar/NavBar";
import { useState } from "react";
import { UserBar } from "./Componentes/UserBar/UserBar";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      <Header />
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
      <Table />
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
