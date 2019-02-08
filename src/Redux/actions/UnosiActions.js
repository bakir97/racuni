import axios from "axios";
export const getAllData = () => async dispatch => {
  const unosi = await axios.get("https://budzet2019.herokuapp.com/Unosi");
  dispatch(storeData(unosi.data));
};
export const getAllCapex = () => async dispatch => {
  const capexi = await axios.get("https://budzet2019.herokuapp.com/Capex");
  dispatch(storeCapexi(capexi.data));
};
export const storeCapex = podaci => async dispatch => {
  const capexi = await axios.post(
    "https://budzet2019.herokuapp.com/Capex",
    podaci
  );
  dispatch(getAllCapex());
};
export const getAllGlavniCapex = () => async dispatch => {
  const capexi = await axios.get(
    "https://budzet2019.herokuapp.com/GlavniCapex"
  );

  dispatch(storeGlavniCapexi(capexi.data));
};
export const storeGlavniCapex = podaci => async dispatch => {
  const capexi = await axios.post(
    "https://budzet2019.herokuapp.com/GlavniCapex",
    podaci
  );
  dispatch(getAllCapex());
};
export const saveAccount = podaci => async dispatch => {
  const capexi = await axios.post(
    "https://budzet2019.herokuapp.com/signUp",
    podaci
  );
};
export const sacuvajPodatke = data => async dispatch => {
  try {
    await axios.post("https://budzet2019.herokuapp.com/Unosi", data);
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
export const storeGlavniCapexi = payload => ({
  type: "ALL_GLAVNI_CAPEXI",
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
