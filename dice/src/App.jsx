import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [rollResult, setRollResults] = useState([]);

  const numberOfRolls = (max, inputValue) => {
    let newResult = [];
    let currentResults = [];
    for (let i = 0; i < inputValue; i++) {
      newResult.push({
        dice: `d${max}`,
        roll: Math.ceil(Math.random() * max),
      });
      currentResults.push(newResult.map((e) => e.roll));
      setRollResults(currentResults[currentResults.length - 1]);
    }

    const multipleRollDiceValue = newResult.reduce(
      (accumulator, value) => accumulator + value.roll,
      0
    );
    newResult = {
      dice: `d${max}`,
      roll: multipleRollDiceValue,
      id: uuidv4(),
    };
    newResult = [newResult, ...result];
    setResult(newResult);
  };

  const addOne = () => {
    setInputValue(inputValue + 1);
  };
  const deductOne = () => {
    setInputValue(inputValue - 1);
  };

  console.log("rollResult:", rollResult);
  return (
    <div className="App">
      <div>You can't roll like Elvis</div>
      <div>
        <button onClick={() => numberOfRolls(4, inputValue)}>d4</button>
        <button onClick={() => numberOfRolls(6, inputValue)}>d6</button>
        <button onClick={() => numberOfRolls(8, inputValue)}>d8</button>
        <button onClick={() => numberOfRolls(10, inputValue)}>d10</button>
        <button onClick={() => numberOfRolls(12, inputValue)}>d12</button>
        <button onClick={() => numberOfRolls(20, inputValue)}>d20</button>
        <button onClick={() => numberOfRolls(100, inputValue)}>d100</button>
      </div>
      <div>
        <p>Results of dice sum</p>
        {rollResult.reduce((a, b) => a + b, 0)}
        <p>Results of each dice</p>
        {rollResult.join(" + ")}
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
