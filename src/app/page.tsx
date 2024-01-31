"use client";

import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./DigitButton";

function reducer(state: any, {type, payload}) {
  switch(type) {
    case ACTIONS.SELECT_DIGIT: {
      return {...state, currentOp: `${state.currentOp || ""}${payload}`}
    }
  }
  return state;
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
        <button className="span-2">AC</button>
        <button>DEL</button>
        {/* <button onClick={() => dispatch({previousOp: "123"})}>/</button> */}
        <DigitButton digit="1" dispatch={dispatch} />
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="span-2">=</button>
      </div>
    </main>
  );
}
