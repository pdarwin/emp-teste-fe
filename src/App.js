import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Componentes/NavBar";
import MyModal from "./Componentes/MyModal";
import MyViewer from "./Componentes/MyViewer";
import { useReducer } from "react";
import { initialState, ModalReducer } from "./Componentes/ModalReducer";
import CustomContext from "./Componentes/CustomContext";

const types = {
  empresas: "Empresas",
  pessoas: "Pessoas",
  salarios: "Salarios",
};

function App() {
  const [modalState, modalDispatch] = useReducer(ModalReducer, initialState);

  const providerState = {
    modalState,
    modalDispatch,
  };

  return (
    <div className="App">
      <CustomContext.Provider value={providerState}>
        <BrowserRouter>
          <MyModal />
          <NavBar />
          <Routes>
            <Route path="/" element={<MyViewer type={types.empresas} />} />
            <Route
              path="/pessoasporempresa/:id"
              element={<MyViewer type={types.pessoas} />}
            />
            <Route
              path="/salariosporpessoa/:id"
              element={<MyViewer type={types.salarios} />}
            />
          </Routes>
        </BrowserRouter>
      </CustomContext.Provider>
    </div>
  );
}

export default App;
