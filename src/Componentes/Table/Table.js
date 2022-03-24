import "./Table.css";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export function Table(props) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    fetch(API_URL + "/getClientes")
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
      {clientes.map(function (element, index) {
        return (
          <table class="styled-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{element.nome}</td>
                <td>6000</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
