export const increment = (data) => {
    return {
        type: "INCREMENT",
        payload:+data
    };
};
export const decrement = (data) => {
    return {
        type: "DECREMENT",
        payload:+data
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
        payload:+data
    };
};
export const incrementByIp = (data) => {
    return {
        type: "INCREMENT_BY_IP",
        payload:+data
    };
};
export const decrementByIp = (data) => {
    return {
        type: "DECREMENT_BY_IP",
        payload:+data
    };
};