import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import axios from "../api/axios";
import { getUserDetails } from "./userActions";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data = await axios.post("/auth", { email, password });
    console.log(data)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

//register
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const data = await axios.post("/register", { username, email, password });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    console.log(data.data.accessToken);
    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
