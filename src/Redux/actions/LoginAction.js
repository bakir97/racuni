import axios from "axios";
import jwt_decode from "jwt-decode";
export const login = podaci => async dispatch => {
  try {
    const test = await axios.post("http://localhost:5000/Login", podaci);
    const decodedUser = jwt_decode(test.data.token);
    dispatch(loginUser(decodedUser));
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};
export const loginUser = payload => ({
  type: "LOGIN_USER",
  payload
});
export const error = payload => ({
  type: "ERROR_LOGIN",
  payload
});
