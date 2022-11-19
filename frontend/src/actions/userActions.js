import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
} from "../constants/userConstants";
import axios from "../api/axios";

//decrypt the access token and insert this int othe userDetails state
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // const {
    //   userLogin: { authData },} = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
      },
    };

    const data = await axios.get(`/users/profile`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//favorites
export const addFavorite = (id) => async (dispatch, getState) => {
  try {
    const authToken = localStorage.getItem("profile");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios({
      method: "post",
      url: `/favorites/${id}`,
      headers: config.headers,
    });
    console.log(data.id);
    dispatch({
      type: ADD_FAVORITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log("add favorite request fail", error);
  }
};

export const removeFavorite = (id) => async (dispatch, getState) => {
  try {
    const authToken = localStorage.getItem("profile");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    console.log("remove favorite action accessed");

    const { data } = await axios({
      method: "delete",
      url: `/favorites/${id}`,
      headers: config.headers,
    });

    dispatch({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: data.id,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log("remove favorite request fail", error);
  }
};
