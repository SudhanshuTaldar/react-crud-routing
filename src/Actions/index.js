export const increment = () => {
    return {
        type: "INCREMENT"
    };
};
export const decrement = () => {
    return {
        type: "DECREMENT"
    };
};
export const reset = () => {
    return {
        type: "RESET"
    };
};
export const getValue = (data) => {
    return {
        type: "GET_VALUE",
        payload: data
    };
};
export const incrementByIp = (data) => {
    console.log(data)
    return {
        type: "INCREMENT_BY_IP",
        payload: data
    };
};
export const decrementByIp = (data) => {
    return {
        type: "DECREMENT_BY_IP",
        payload: data
    };
};
export const ValidateInput = (data) => {
    return { type: "VALIDATE_IP", payload: data };
};
export const incrementAsync = () => {
    return {
        type: "INCREMENT_ASYNC"
    };
};
export const decrementAsync = () => {
    return {
        type: "DECREMENT_ASYNC"
    };
};
