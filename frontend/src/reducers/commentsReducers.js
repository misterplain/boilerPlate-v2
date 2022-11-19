import {
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
} from "../constants/commentsConstants";

export const commentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true, comments: [] };

    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };

    case GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };

    case ADD_COMMENT_SUCCESS:
      const newComment = action.payload.newComment;
      let newAddState = { ...state };

      {
        newAddState.comments
          ? (newAddState.comments = [newComment, ...newAddState.comments])
          : (newAddState.comments = [newComment]);
      }
      // newAddState.comments = [newComment, ...newAddState.comments];
      return newAddState;

    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    case DELETE_COMMENT_SUCCESS:
      const commentId = action.payload.data.id;
      let newDeleteState = { ...state };
      console.log(commentId);
      console.log(newDeleteState);
      newDeleteState.comments = newDeleteState.comments.filter(
        (comment) => comment._id !== commentId
      );

      console.log(newDeleteState);
      return newDeleteState;
    // return {
    //   loading: false,
    //   error: null,
    //   comments: state.comments.filter((comment) => comment._id !== commentId),
    // };

    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_COMMENT_SUCCESS:
      const editedCommentId = action.payload.updatedComment._id;
      console.log(editedCommentId);
      let newEditState = { ...state };
      const editedComment = action.payload.updatedComment.comment;
      console.log(editedComment);
      let commentToEdit = newEditState.comments.find(
        (comment) => comment._id === editedCommentId
      );
      console.log(commentToEdit);
      commentToEdit.comment = editedComment;
      console.log(newEditState);
      return newEditState;

    default:
      return state;
  }
};
