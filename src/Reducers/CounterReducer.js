const init = { counter: 0, Data: 0 }
const CounterReducer = (state = init, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "DECREMENT":
            if (state.counter === 0)
                return {
                    ...state,
                    counter: state.counter = 0
                }
            else {
                return {
                    ...state,
                    counter: state.counter - 1
                }
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
            return {
                ...state,
                counter: state.counter + action.payload
            }
        case "DECREMENT_BY_IP":
            if (state.counter === 0) {
                return {
                    ...state,
                    counter: state.counter = 0
                }
            }
            else {
                return {
                    ...state,
                    counter: state.counter - action.payload
                }
            }
        default:
            return state
    }
}
export default CounterReducer