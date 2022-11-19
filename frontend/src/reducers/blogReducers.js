import {
    BLOG_POST_FAIL,
    BLOG_POST_REQUEST,
    BLOG_POST_SUCCESS,
  } from "../constants/blogConstants";

  export const blogReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_POST_REQUEST:
        return { loading: true };

      case BLOG_POST_SUCCESS:
        return { loading: false, posts: action.payload };

      case BLOG_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }