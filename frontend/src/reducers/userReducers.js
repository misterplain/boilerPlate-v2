import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_REQUEST,
} from "../constants/userConstants";
import { useSelector } from "react";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    //user details request
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userData: action.payload.data,
        loading: false,
        errors: null,
      };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    //remove user details
    case USER_DETAILS_RESET:
      return {
        userData: null,
      };

    //favorites
    case ADD_FAVORITE_REQUEST:
      return { loading: true };

    case ADD_FAVORITE_SUCCESS:
      let newFavorite = action.payload.id;
      let cloneState = { ...state };
      cloneState.userData.favorites = [
        ...cloneState.userData.favorites,
        newFavorite,
      ];
      return cloneState;

    case ADD_FAVORITE_FAIL:
      return { loading: false, error: action.payload.message };

    case REMOVE_FAVORITE_REQUEST:
      return { loading: true };

    case REMOVE_FAVORITE_SUCCESS: {
      let removedFavoriteId = action.payload;
      let cloneState = { ...state };
      cloneState.userData.favorites = cloneState.userData.favorites.filter(
        (favorite) => favorite !== removedFavoriteId
      );
      return cloneState;
    }

    case REMOVE_FAVORITE_FAIL:
      return { loading: false, error: action.payload.message };

    default:
      return state;
  }
};
