import React from "react";

import "./Table.css";

const tableData = [
  {
    Company: "Test Company 1",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 2",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 3",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 4",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 5",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 6",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 7",
    Contact: "This is a contact",
    Country: "Portugal",
  },
  {
    Company: "Test Company 8",
    Contact: "This is a contact",
    Country: "Portugal",
  },
];

export function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((e, index) => {
          return <TableLine key={index} element={e}></TableLine>;
        })}
      </tbody>
    </table>
  );
}

function TableLine(props) {
  return (
    <tr>
      <td>{props.element.Company}</td>
      <td>{props.element.Contact}</td>
      <td>{props.element.Country}</td>
    </tr>
  );
}
