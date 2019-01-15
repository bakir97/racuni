const initialState = {
  user: {},
  data: [],
  jedanUnos: {},
  allCapexi: [],
  capexiDatumi: [],
  errorLogin: {},
  success: false
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
        data: payload.reverse()
      };
    case "CAPEXI_DATUMI":
      return {
        ...state,
        capexiDatumi: payload
      };

    case "ALL_CAPEXI":
      return {
        ...state,
        allCapexi: payload
      };
    case "ERROR_LOGIN":
      return {
        ...state,
        errorLogin: payload
      };

    case "JEDAN_UNOS":
      return {
        ...state,
        jedanUnos: payload
      };
    case "SUCCESS":
      return {
        ...state,
        success: payload
      };

    default:
      return state;
  }
};
