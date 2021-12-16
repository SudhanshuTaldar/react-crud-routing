export const ValidateInput = (action) => {
    if (action.type === "INCREMENT_BY_IP" || action.type === "DECREMENT_BY_IP") {
      if (action.payload >= 0) {
        return action.payload;
      } else {
        if (typeof action.payload === "string") {
          return (action.payload = 1);
        } else return parseInt(action.payload);
      }
    }
  };
  
