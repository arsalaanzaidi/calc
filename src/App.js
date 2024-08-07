import { useReducer } from "react";
import "./App.css";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function evaluate(state) {
  let calculation = "";
  switch (state.operation) {
    case "+":
      return {
        ...state,
        previousOperand: (
          parseFloat(state.previousOperand) + parseFloat(state.currentOperand)
        ).toString(),
        currentOperand: null,
      };
    case "-":
      return {
        ...state,
        previousOperand: (
          parseFloat(state.previousOperand) - parseFloat(state.currentOperand)
        ).toString(),
        currentOperand: null,
      };
    case "X":
      return {
        ...state,
        previousOperand: (
          parseFloat(state.previousOperand) * parseFloat(state.currentOperand)
        ).toString(),
        currentOperand: null,
      };
    case "/":
      if (state.currentOperand === "0") {
        alert("dividing by zero you ignorant fuck");
        return state;
      }
      return {
        ...state,
        previousOperand: (
          parseFloat(state.previousOperand) / parseFloat(state.currentOperand)
        ).toString(),
        currentOperand: null,
      };
    default:
      return;
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-in", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand) {
    const [integer, decimal] = operand.split(".");
    if (!decimal) {
      return INTEGER_FORMATTER.format(integer);
    }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  }
  return;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand?.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;
      if (state.previousOperand == null)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      if (state.currentOperand == null) {
        return { ...state, operation: payload.operation };
      }
      const { previousOperand, currentOperand } = evaluate(state);
      return {
        ...state,
        previousOperand: previousOperand,
        currentOperand: currentOperand,
        operation: payload.operation,
      };
    case ACTIONS.EVALUATE:
      if (!state.previousOperand) {
        return state;
      }
      if (!state.currentOperand) {
        return {
          ...state,
          currentOperand: state.previousOperand,
          previousOperand: null,
          operation: null,
        };
      }
      const evaluatedState = evaluate(state);
      return {
        ...state,
        ...evaluatedState,
        previousOperand: null,
        currentOperand: evaluatedState.previousOperand,
        operation: null,
        overwrite: true,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {};
      }
      if (state.currentOperand) {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(
            0,
            state.currentOperand.length - 1
          ),
        };
      }
      return state;
    default:
      return;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="X" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
