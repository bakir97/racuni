import axios from "axios";
import jwt_decode from "jwt-decode";
export const login = podaci => async dispatch => {
  try {
    const test = await axios.post(
      "https://budzet2019.herokuapp.com/Login",
      podaci
    );
    const decodedUser = jwt_decode(test.data.token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    dispatch(loginUser(decodedUser));
  } catch (error) {
    dispatch(errorLogin(error.response.data));
    console.log(error);
    console.log(error.response.data);
  }
};
export const loginUser = payload => ({
  type: "LOGIN_USER",
  payload
});
export const errorLogin = payload => ({
  type: "ERROR_LOGIN",
  payload
});
