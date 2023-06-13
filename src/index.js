import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function App() {
  const [display, setDisplay] = React.useState("0"); // valor começa como 0
  const [number1, setNumber1] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = React.useState(false);

  function inputNumber(number) {
    if (display === "0" || shouldResetDisplay) {
      setDisplay(number);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + number);
    }
  }

  function inputOperator(op) {
    // se for o primeiro numero clicado cai no else

    // se eu ja tenho um operador e ja esscolhi o primeiro numero
    if (number1 !== null && operator !== null && !shouldResetDisplay) {
      const resultado = match(); //faz a operação e retorna
      setNumber1(resultado); // agora ele subistitui o number1 como resultado
      setDisplay(String(resultado)); //exibe em forma de string na tela
    } else {
      // define no number1 o primeiro numero que vc escolheu
      setNumber1(parseInt(display));
    }

    setOperator(op); //define o operador no qual clicado
    setShouldResetDisplay(true); // define que ja foi escolhido o primeiro numero e pode passar para o prox
  }

  function match() {
    const number2 = parseFloat(display); //guarda o numero digitado como segundo numero
    //numero1 ja esta definido, o numero2 esta sendo definido como oq esta na tela no momento
    let resultado;
    if (operator === "+") {
      resultado = number1 + number2;
    } else if (operator === "-") {
      resultado = number1 - number2;
    } else if (operator === "*") {
      resultado = number1 * number2;
    } else if (operator === "/") {
      resultado = number1 / number2;
    }
    return resultado;
  }

  function calculate() {
    if (shouldResetDisplay) return; // Se shouldResetDisplay for true, não fazer nada
    if (number1 === null || operator === null) return; // Se os valores não estiverem definidos, não fazer nada

    const resultado = match();
    setDisplay(String(resultado));
    setNumber1(resultado);
    setOperator(null);
    setShouldResetDisplay(true);
  }

  function clean() {
    setOperator(null);
    setNumber1(null);
    setDisplay("0");
    setShouldResetDisplay(false);
  }

  return (
    <div class="main">
      <div class="display">
        <div class="text">{display}</div>
      </div>
      <div class="keypad">
        <div class="input-keys">
          <div class="function-keys">
            <button onClick={() => clean()}>AC</button>
          </div>
          <div class="digit-keys">
            <button onClick={() => inputNumber("0")}>0</button>
            <button onClick={() => inputNumber("1")}>1</button>
            <button onClick={() => inputNumber("2")}>2</button>
            <button onClick={() => inputNumber("3")}>3</button>
            <button onClick={() => inputNumber("4")}>4</button>
            <button onClick={() => inputNumber("5")}>5</button>
            <button onClick={() => inputNumber("6")}>6</button>
            <button onClick={() => inputNumber("7")}>7</button>
            <button onClick={() => inputNumber("8")}>8</button>
            <button onClick={() => inputNumber("9")}>9</button>
          </div>
        </div>
        <div class="operator-keys">
          <button onClick={() => inputOperator("/")}>÷</button>
          <button onClick={() => inputOperator("*")}>×</button>
          <button onClick={() => inputOperator("-")}>−</button>
          <button onClick={() => inputOperator("+")}>+</button>
          <button onClick={() => calculate()}>=</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
