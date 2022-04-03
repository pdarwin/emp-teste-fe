import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Loja from "./Componentes/Loja/Loja";
import { Login } from "./Componentes/Login";
import Editoras from "./Componentes/Admin/Editoras";
import Autores from "./Componentes/Admin/Autores";
import NavBar from "./Componentes/NavBar";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import { Registo } from "./Componentes/Registo";
import Clientes from "./Componentes/Admin/Clientes";
import Livros from "./Componentes/Admin/Livros";
import { InfoLivro } from "./Componentes/Loja/InfoLivro";
import MyModal from "./Componentes/MyModal";
import Contactos from "./Componentes/Contactos";

function App() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    staff: false,
    shoppingCart: [],
  });

  const API_URL = "http://localhost:8080";

  const myTheme = createTheme({
    palette: {
      primary: indigo,
      secondary: orange,
    },
  });

  //Gestão do MyModal
  const [open, setOpen] = useState(false);
  const [errLevel, setErrLevel] = useState("error");
  const [err, setErr] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Livraria Requalificar";
  }, []);

  function addQuantity(item) {
    //só deixa prosseguir na rotina se existir um user logado, e não for staff
    if (user.id != "" && !user.staff) {
      let oldShoppingCart = user.shoppingCart;

      //verificar se um item já existe
      if (oldShoppingCart.some((e) => e.item.id === item.id)) {
        oldShoppingCart = oldShoppingCart.map((e) => {
          if (e.item.id === item.id) {
            e.quantity++;
          }
          return e;
        });
      } else {
        let myItem = {
          quantity: 1,
          item: item,
        };
        oldShoppingCart = [myItem, ...oldShoppingCart];
      }

      setUser({ ...user, shoppingCart: oldShoppingCart });
      setErr("Adicionou o livro " + item.titulo + " ao carrinho de compras.");
      setErrLevel("success");
      handleOpen();
    } else {
      setErr(
        "É necessário estar registado como cliente para poder comprar este livro."
      );
      setErrLevel("info");
      handleOpen();
    }
  }

  function removeQuanitty(item) {
    let oldShoppingCart = user.shoppingCart;

    //verificar se um item já existe
    if (oldShoppingCart.some((e) => e.item.id === item.id)) {
      oldShoppingCart = oldShoppingCart.map((e) => {
        if (e.item.id === item.id) {
          e.quantity--;
        }
        return e;
      });

      oldShoppingCart = oldShoppingCart.filter((e) => e.quantity > 0);

      setUser({ ...user, shoppingCart: oldShoppingCart });
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <MyModal
          open={open}
          err={err}
          errLevel={errLevel}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <NavBar
          theme={myTheme}
          user={user}
          setUser={setUser}
          shoppingCart={user.shoppingCart}
          cartControls={{
            increaseQuantity: addQuantity,
            decreaseQuantity: removeQuanitty,
          }}
          modalControls={{
            setOpen: setOpen,
            setErr: setErr,
            setErrLevel: setErrLevel,
            handleOpen: handleOpen,
            handleClose: handleClose,
          }}
          API_URL={API_URL}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Loja
                theme={myTheme}
                user={user}
                addItem={addQuantity}
                modalControls={{
                  setOpen: setOpen,
                  setErr: setErr,
                  setErrLevel: setErrLevel,
                  handleOpen: handleOpen,
                  handleClose: handleClose,
                }}
                API_URL={API_URL}
              />
            }
          ></Route>
          <Route
            path="/contactos"
            element={<Contactos theme={myTheme} />}
          ></Route>
          <Route
            path="/login"
            element={
              <VerificaNoUser user={user}>
                <Login
                  theme={myTheme}
                  setUser={setUser}
                  modalControls={{
                    setOpen: setOpen,
                    setErr: setErr,
                    setErrLevel: setErrLevel,
                    handleOpen: handleOpen,
                    handleClose: handleClose,
                  }}
                  API_URL={API_URL}
                />
              </VerificaNoUser>
            }
          ></Route>
          <Route
            path="/registo"
            element={
              <VerificaNoUser user={user}>
                <Registo
                  theme={myTheme}
                  user={user}
                  setUser={setUser}
                  modalControls={{
                    setOpen: setOpen,
                    setErr: setErr,
                    setErrLevel: setErrLevel,
                    handleOpen: handleOpen,
                    handleClose: handleClose,
                  }}
                  API_URL={API_URL}
                />
              </VerificaNoUser>
            }
          ></Route>
          <Route
            path="/livros"
            element={
              <VerificaStaff>
                <Livros theme={myTheme} API_URL={API_URL} />
              </VerificaStaff>
            }
          ></Route>
          <Route
            path="/livros/:id"
            element={
              <InfoLivro
                theme={myTheme}
                user={user}
                addItem={addQuantity}
                API_URL={API_URL}
              />
            }
          ></Route>
          <Route
            path="/autores"
            element={
              <VerificaStaff user={user}>
                <Autores theme={myTheme} API_URL={API_URL} />
              </VerificaStaff>
            }
          ></Route>
          <Route
            path="/editoras"
            element={
              <VerificaStaff user={user}>
                {" "}
                <Editoras theme={myTheme} API_URL={API_URL} />
              </VerificaStaff>
            }
          ></Route>
          <Route
            path="/clientes"
            element={
              <VerificaStaff user={user}>
                <Clientes theme={myTheme} API_URL={API_URL} />
              </VerificaStaff>
            }
          ></Route>
          <Route path="/staff"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Verifica se não está logado
function VerificaNoUser({ user, children }) {
  if (user.username != "") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

// Verifica se é staff
function VerificaStaff({ user, children }) {
  if (!user.staff) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
