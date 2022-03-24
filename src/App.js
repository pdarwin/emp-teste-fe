import "./App.css";
import { Contador } from "./Componentes/Contador/Contador";
import { Layout } from "./StatelessExercicio1/Layout";
import { ToDo } from "./Componentes/ToDoList/ToDo";
import { Header } from "./Componentes/Header/Header";
import { Table } from "./Componentes/Table/Table";

function App() {
  return (
    <div className="App">
      {<Header></Header>}
      {
        <Table></Table>
        /* {<Layout></Layout>}
      {<Contador></Contador>} 
      { <ToDo></ToDo>*/
      }
    </div>
  );
}

export default App;
