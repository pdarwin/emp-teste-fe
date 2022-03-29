import "./Table.css";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export function Table(props) {
  const [clientes, setClientes] = useState([]);
  const [selecionado, setSelecionado] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    fetch(API_URL + "/getClientes", {
      headers: { "Content-type": "application/json" },
    })
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
        setClientes(parsedResponse);
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        //setPessoasList(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Detalhe</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.nome}</td>
                <td>{element.email}</td>
                <td>
                  <button
                    class="button-3"
                    role="button"
                    onClick={() => {
                      setSelecionado(index);
                      console.log(index);
                    }}
                  >
                    Detalhe
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
