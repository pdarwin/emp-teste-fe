import "./App.css";
import { Contador } from "./Contador/Contador";
import { Layout } from "./StatelessExercicio1/Layout";
import { ToDo } from "./ToDoList/ToDo";

function App() {
  return (
    <div className="App">
      {/* {<Layout></Layout>}
      {<Contador></Contador>} */}
      {<ToDo></ToDo>}
    </div>
  );
}

export default App;
