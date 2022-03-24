import "./ToDo.css";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export function ToDo(props) {
  const [pessoas, setPessoas] = useState([]);
  const [novaPessoa, setNovaPessoa] = useState({ nome: "", idade: 1 });
  const [pessoaSelected, setPessoaSelected] = useState(null);

  useEffect(() => {
    getPessoas();
  }, []);

  function getPessoas() {
    fetch(API_URL + "/getPessoas")
      .then((response) => {
        console.log(response);
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setPessoas(parsedResponse);
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        //setPessoasList(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addPessoa() {
    //if (novaPessoa.nome.trim().length !== 0 && novaPessoa.idade > 0) {
    fetch(API_URL + "/addPessoa/2", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ nome: "aaaa", idade: 1 }),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        console.log(response);
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        // Precisamos de refrescar a lista, se tivessemos o id bastava adicionar um novo com o id
        getPessoas();
      })
      .catch((error) => {
        alert(error);
      });
    //}
  }

  /* function addTodo() {
    if (newToDo.trim().length !== 0) {
      //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
      let pessoasAux = pessoas;

      let newTodoAux = newToDo;

      //Adicionamos um elemento à lista temporaria
      pessoasAux = [newTodoAux, ...pessoasAux];

      //definimos o estado como a nossa nova lista
      setPessoas(pessoasAux);
    }
  } */

  function removePessoa(indice) {
    /*
    //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
    let pessoasAux = pessoas;

    //Filtramos o que não queremos
    pessoasAux = pessoasAux.filter((e, i) => i !== indice);

    //Da set do selecionado a null caso seja apagado
    if (selectedToDo === indice) {
      setSelectedToDo(null);
    }

    //definimos o estado como a nossa nova lista
    setPessoas(pessoasAux);*/
  }

  function updatePessoa() {
    //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
    /*   let pessoasAux = pessoas;

    pessoasAux = pessoasAux.map((todo, index) => {
      if (selectedToDo === index) {
        todo = newToDo;
      }
      return todo;
    });

    setPessoas(pessoasAux);*/
  }

  return (
    <>
      <header className="App-header">
        <h3>Lista por nome da pessoa</h3>
      </header>

      <section className="list-container">
        {pessoas.map(function (element, index) {
          return (
            <div key={index} className="todo-card">
              <p
                className="todo-text"
                onClick={() => setPessoaSelected(element)}
              >
                {"Nome: " + element.nome + ", idade: " + element.idade}
              </p>
              <button
                className="todo-remove"
                onClick={() => removePessoa(element.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </section>

      <div>
        <p>Pessoa Selecionada</p>
        <p>
          nome:
          {pessoaSelected.nome + " idade: " + pessoaSelected.idade}
        </p>
        <p>Nome:</p>
        <input
          type="text"
          value={novaPessoa.nome}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, nome: e.target.value });
          }}
        />
        <p>Idade:</p>
        <input
          type="number"
          value={novaPessoa.idade}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, idade: e.target.value });
          }}
        />
        <p>Ação:</p>
        <button onClick={addPessoa}>Add Pessoa</button>
        <button onClick={updatePessoa}>Update Pessoa</button>
      </div>
    </>
  );
}
