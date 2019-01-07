import axios from "axios";
export const getAllData = () => async dispatch => {
  const unosi = await axios.get("http://localhost:5000/Unosi");
  dispatch(storeData(unosi.data));
};
export const storeData = payload => ({
  type: "ALL_DATA",
  payload
});
export const jedanUnos = payload => ({
  type: "JEDAN_UNOS",
  payload
});
