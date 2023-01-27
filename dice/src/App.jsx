import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [rollResult, setRollResults] = useState(0);

  const numberOfRolls = (inputValue, roll) => {
    for (let i = 0; i < inputValue; i++) {
      roll([i]);
    }
  };

  const roll = (max) => {
    setResult([
      ...result,
      { dice: `d${max}`, roll: Math.ceil(Math.random() * max), id: uuidv4() },
    ]);
  };

  console.log(inputValue);
  console.log(result);

  const addOne = () => {
    setInputValue(inputValue + 1);
  };
  const deductOne = () => {
    setInputValue(inputValue - 1);
  };

  return (
    <div className="App">
      <div>You can't roll like Elvis</div>
      <div>
        <button onClick={() => numberOfRolls(4, inputValue)}>d4</button>
        <button onClick={() => roll(6, inputValue)}>d6</button>
        <button onClick={() => roll(8, inputValue)}>d8</button>
        <button onClick={() => roll(10, inputValue)}>d10</button>
        <button onClick={() => roll(12, inputValue)}>d12</button>
        <button onClick={() => roll(20, inputValue)}>d20</button>
        <button onClick={() => roll(100, inputValue)}>d100</button>
      </div>

      <label id="rolls">Number of dices</label>
      <div>
        <button onClick={() => deductOne()}>-</button>
        <input
          id="rolls"
          min={1}
          value={inputValue}
          type="number"
          placeholder="Number of Rolls"
          step={1}
        />
        <button onClick={() => addOne()}>+</button>
      </div>

      <div>
        History
        {result.map((e) => {
          return (
            <div key={e.id}>
              {e.dice} : {e.roll}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

// {result.length > 0 && `roll:${result[result.length-1].roll}`}
