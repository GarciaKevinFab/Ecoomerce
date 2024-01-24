import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // Using axios for the POST request
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
