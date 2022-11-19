import axios from "../api/axios";
import {
  BLOG_POST_FAIL,
  BLOG_POST_REQUEST,
  BLOG_POST_SUCCESS,
} from "../constants/blogConstants";

export const fetchBlogPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_POST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/blogs", config);

    dispatch({
      type: BLOG_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
