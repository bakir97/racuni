const initialState = {
  user: {},
  data: [],
  jedanUnos: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: { ...payload, isAuth: Object.keys(payload).length > 0 }
      };
    case "ALL_DATA":
      return {
        ...state,
        data: payload
      };
    case "JEDAN_UNOS":
      return {
        ...state,
        jedanUnos: payload
      };

    default:
      return state;
  }
};
