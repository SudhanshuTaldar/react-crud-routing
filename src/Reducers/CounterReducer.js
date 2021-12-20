const init = { counter: 0, Data: 0 }
const CounterReducer = (state = init, action) => {
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
            return {
                ...state,
                counter: Number(state.counter) + Number(+action.payload)
            }
        case "DECREMENT_BY_IP":
                return {
                    ...state,
                    counter: Number(state.counter) - Number(+action.payload)
                }
            
        default:
            return state
    }
}
export default CounterReducer