const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        ...payload,
        isAuth: Object.keys(payload).length > 0
      };

    default:
      return state;
  }
};
