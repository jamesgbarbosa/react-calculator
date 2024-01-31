"use client";

import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";

function reducer(state: any, { type, payload }) {
  switch (type) {

    case ACTIONS.SELECT_DIGIT: {
      if (payload.digit === "0" && state.currentOperand === "0") { return state }
      if (payload.digit === "." && state.currentOperand?.includes(".")) { return state }
      if (state.currentOperand == 'Syntax Error') {
        return { ...state, currentOperand: `${payload.digit}` }
      }
      return { ...state, currentOperand: `${state.currentOperand || ""}${payload.digit}` }
    }

    case ACTIONS.SELECT_OPERATION: {
      if (state.currentOperand == 'Syntax Error') {
        return { ...state }
      }
      if (state.operation && payload.operation) {
        return {
          ...state,
          currentOperand: null,
          previousOperand: `${state.currentOperand ? evaluate(state) : state.previousOperand}`,
          operation: payload.operation
        }
      }
      if (state.currentOperand) {
        return { ...state, previousOperand: `${state.currentOperand}`, currentOperand: null, operation: payload.operation }
      }
      return { ...state }
    }

    case ACTIONS.EVALUATE: {
      if (state.previousOperand && state.currentOperand) {
        return {
          ...state,
          previousOperand: null,
          currentOperand: evaluate(state),
          operation: null
        }
      }

      return {...state}
      
    }
    

    case ACTIONS.CLEAR: {
      return {}
    }

    case ACTIONS.DELETE: {
      return {...state, currentOperand: state?.currentOperand?.slice(0, -1)}
    }
  }
  return state;
}

function evaluate(state) {
  const prev = parseFloat(state.previousOperand)
  const curr = parseFloat(state.currentOperand)
  let res = 0;
  if (isNaN(prev) || isNaN(curr)) {
    return "Syntax Error";
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
  return res == Infinity ? "Syntax Error": res.toString();
}

export const ACTIONS = {
  SELECT_DIGIT: "select_digit",
  CLEAR: "clear",
  DELETE: "delete",
  SELECT_OPERATION: "select_operation",
  EVALUATE: "evaluate"
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <main>
      <div className="calculator">
        <div className="output">
          <div className="previous-op">
            {state.previousOperand} {state.operation}
          </div>
          <div className="current-op">
            {state.currentOperand}
          </div>

        </div>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="span-2">AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
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
        <button onClick={ () => dispatch({type: ACTIONS.EVALUATE})} className="span-2">=</button>
      </div>
    </main>
  );
}
