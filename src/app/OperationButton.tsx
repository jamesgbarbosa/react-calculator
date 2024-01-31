import { ACTIONS } from "./page";

export function OperationButton({ digit, dispatch }) {
    return <button onClick={() => dispatch({type: ACTIONS.SELECT_OPERATION, payload: {operation: digit}})}>
        {digit}
    </button>
}