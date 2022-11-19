import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import { userReducer } from "./reducers/userReducers";
import { blogReducer } from "./reducers/blogReducers";
import { commentsReducer } from "./reducers/commentsReducers";
import logger from "redux-logger";

const reducer = combineReducers({
  userLogin: authReducer,
  userDetails: userReducer,
  blogPosts: blogReducer,
  comments: commentsReducer,
});

// userInfo stored in local storage
const userInfoFromStorage = localStorage.getItem("profile")
  ? (localStorage.getItem("profile"))
  : null;

const initialState = {
  userLogin: { authData: userInfoFromStorage },
};

// const initialState = {}

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
