import { ACTIONS } from "./page";

export function DigitButton({ digit, dispatch }) {
    return <button onClick={() => dispatch({type: ACTIONS.SELECT_DIGIT, payload: {digit}})}>
        {digit}
    </button>
}