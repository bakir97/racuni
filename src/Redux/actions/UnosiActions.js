import axios from "axios";
export const getAllData = () => async dispatch => {
  const unosi = await axios.get("http://localhost:5000/Unosi");
  dispatch(storeData(unosi.data));
};
export const getAllCapex = () => async dispatch => {
  const capexi = await axios.get("http://localhost:5000/Capex");
  dispatch(storeCapexi(capexi.data));
};
export const storeCapex = podaci => async dispatch => {
  const capexi = await axios.post("http://localhost:5000/Capex", podaci);
  dispatch(getAllCapex());
};
export const saveAccount = podaci => async dispatch => {
  const capexi = await axios.post("http://localhost:5000/signUp", podaci);
};
export const sacuvajPodatke = data => async dispatch => {
  try {
    await axios.post("http://localhost:5000/Unosi", data);
    dispatch(getAllData());
    dispatch(success(true));
  } catch (error) {
    console.log(error.response.data);
  }
};
export const storeCapexi = payload => ({
  type: "ALL_CAPEXI",
  payload
});
export const success = payload => ({
  type: "SUCCESS",
  payload
});

export const capexiIDatumi = payload => ({
  type: "CAPEXI_DATUMI",
  payload
});

export const storeData = payload => ({
  type: "ALL_DATA",
  payload
});
export const jedanUnos = payload => ({
  type: "JEDAN_UNOS",
  payload
});
