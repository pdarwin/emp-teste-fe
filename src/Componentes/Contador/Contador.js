import "./Contador.css";
import React, { useState } from "react";

export function Contador() {
  const [counter, setCounter] = useState(0);
  const [increased, setIncreased] = useState(true);

  const increase = () => {
    setCounter(counter + 1);
    setIncreased(true);
  };

  const decrease = () => {
    setCounter(counter - 1);
    setIncreased(false);
  };

  const reset = () => {
    setCounter(0);
  };

  return (
    <div className="counter">
      <h1>React Counter</h1>
      <span className="counter__output">{counter}</span>
      <div className="btn__container">
        <button className="control__btn" onClick={increase}>
          +
        </button>
        <button className="control__btn" onClick={decrease}>
          -
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
      {increased ? <h3>O contador aumentou</h3> : <h3>O contador diminuiu</h3>}
    </div>
  );
}
