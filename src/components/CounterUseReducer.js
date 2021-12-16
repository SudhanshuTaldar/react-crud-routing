import React, { useReducer } from 'react'
import { ValidateInput } from '../Middleware/ValidateInput'
import Header from './Header'

const initialState = { counter: 0, Data: 0 }
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "DECREMENT":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "RESET":
            return {
                ...state,
                counter: state.counter = 0
            }
        case "GET_VALUE":
            return {
                ...state,
                Data: action.payload
            };
        case "INCREMENT_BY_IP":

            return{
                ...state,
                counter: state.counter + +action.payload
            }
        case "DECREMENT_BY_IP":
            return{
                ...state,
                counter: state.counter - action.payload
            }

        default:
            return state
    }
}
//custom useReducer hook
const useReducerWithMiddleware = (reducer, initialState, ValidateInput) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchWithMiddleware = (action) => {  //custom dipatch
        ValidateInput(action);
        dispatch(action);
    };

    return [state, dispatchWithMiddleware];
};
 
//main
export default function CounterUseReducer() {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const [state, dispatch] = useReducerWithMiddleware(reducer, initialState, ValidateInput)

    const inputHandler = (e) => {
        dispatch({ type: 'GET_VALUE', payload: e.target.value })
    }
    return (
        <>
            <Header />
            <div>
                <div style={{ textAlign: "center" }}>Counter = {state.counter} </div>
                <div>
                    <input type="text" id="counter" name="counter" value={state.Data} onChange={inputHandler} />
                </div>
                <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment ++</button>
                <button onClick={() => dispatch({ type: "INCREMENT_BY_IP", payload: state.Data })}>Inc by input ++</button>
                <button onClick={() => dispatch({ type: "RESET" })}>Reset 0</button>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement - -</button>
                <button onClick={() => dispatch({ type: "DECREMENT_BY_IP", payload: state.Data })}>Dec by input - -</button>
            </div>
        </>
    )
}
