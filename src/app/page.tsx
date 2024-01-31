"use client";

import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";

function reducer(state: any, { type, payload }) {
  switch (type) {

    case ACTIONS.SELECT_DIGIT: {
      if (payload === "0" && state.currentOp === "0") { return state }
      if (payload === "." && state.currentOp?.includes(".")) { return state }
      return { ...state, currentOp: `${state.currentOp || ""}${payload.digit}` }
    }

    case ACTIONS.SELECT_OPERATION: {
      
      if (state.operation && payload.operation) {
        return {
          ...state,
          currentOp: null,
          previousOp: `${evaluate(state)} ${payload.operation}`,
          operation: payload.operation
        }
      }
      if (state.currentOp) {
        return { ...state, previousOp: `${state.currentOp} ${payload.operation}`, currentOp: null, operation: payload.operation }
      }
      return { ...state }
    }
    

    case ACTIONS.CLEAR: {
      return {}
    }
  }
  return state;
}

function evaluate(state) {
  const prev = parseFloat(state.previousOp)
  const curr = parseFloat(state.currentOp)
  let res = 0;
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }
  switch (state.operation) {
    case "+": {
      res = prev + curr;
      break;
    }
    case "-": {
      res = prev - curr;
      break;
    }
    case "/": {
      res = prev / curr;
      break;
    }
    case "*": {
      res = prev * curr;
      break;
    }
  }
  return res.toString();
}

export const ACTIONS = {
  SELECT_DIGIT: "select_digit",
  CLEAR: "clear",
  DELETE: "delete",
  SELECT_OPERATION: "select_operation"
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <main>
      <div className="calculator">
        <div className="output">
          <div className="previous-op">
            {state.previousOp}
          </div>
          <div className="current-op">
            {state.currentOp}
          </div>

        </div>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="span-2">AC</button>
        <button>DEL</button>
        <OperationButton digit="/" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton digit="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton digit="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton digit="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className="span-2">=</button>
      </div>
    </main>
  );
}
