import { useReducer } from "react";
import "./App.css";
import "./styles.css";
import DigitButton from "./DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${currentOperand || ""} ${payload.digit}`,
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <DigitButton>DEL</DigitButton>
      <DigitButton>/</DigitButton>
      <DigitButton>1</DigitButton>
      <DigitButton>2</DigitButton>
      <DigitButton>3</DigitButton>
      <DigitButton>X</DigitButton>
      <DigitButton>4</DigitButton>
      <DigitButton>5</DigitButton>
      <DigitButton>6</DigitButton>
      <DigitButton>+</DigitButton>
      <DigitButton>7</DigitButton>
      <DigitButton>8</DigitButton>
      <DigitButton>9</DigitButton>
      <DigitButton>-</DigitButton>
      <DigitButton>.</DigitButton>
      <DigitButton>0</DigitButton>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
