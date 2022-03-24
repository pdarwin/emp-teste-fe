import React from "react";

export function Grid() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid-container-inside">
      {numbers.map((e, index) => (
        <GridElement key={index} number={e}></GridElement>
      ))}
    </div>
  );
}

function GridElement(props) {
  return <div className="grid-item">{props.number}</div>;
}
