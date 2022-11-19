import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.data.accessToken);
      return {
        loading: false,
        authData: action.payload.data.accessToken,
        errors: null,
      };

    case USER_LOGIN_FAIL:
      return { loading: false, loginError: action.payload };

    case USER_LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        authData: null,
      };

    //register
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      localStorage.setItem("profile", action.payload.data.accessToken);
      return {
        authData: action.payload.data.accessToken,
        loading: false,
        errors: null,
      };

    case USER_REGISTER_FAIL:
      return { loading: false, registerError: action.payload };

    default:
      return state;
  }
};
