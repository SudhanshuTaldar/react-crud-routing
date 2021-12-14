import CounterReducer from "./CounterReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter:CounterReducer
});
export default allReducers