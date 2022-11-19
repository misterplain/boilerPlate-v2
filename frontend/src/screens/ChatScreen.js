import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { fetchComments } from "../actions/commentsActions";
import { getUserDetails } from "../actions/userActions";
import {
  addComment,
  deleteComment,
  editComment,
} from "../actions/commentsActions";

const Comment = ({ comment }) => {
  const token = useSelector((state) => state.userLogin.authData);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const userInfo = useSelector((state) => state.userDetails.userData);

  return (
    <Col key={comment.id} className='mb-2'>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{comment.username} says:</Card.Title>
          {edit ? (
            <Form style={{ margin: "10px" }}>
              <Form.Group className='mb-3' controlId='updateComment'>
                <Form.Control
                  type='textarea'
                  rows={3}
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  placeholder={`${comment.comment}`}
                  style={{ width: "95%" }}
                />
              </Form.Group>
              <Button
                variant='outline-success'
                type='submit' size="sm" className="mr-2"
                onClick={() => {
                  dispatch(
                    editComment({
                      token: token,
                      id: comment._id,
                      comment: editCommentText,
                    })
                  );
                  setEdit(false);
                }}
              >
                Send edit
              </Button>
              <Button variant='outline-danger' size="sm" className="ms-2" onClick={() => setEdit(false)}>
                Exit editor
              </Button>
            </Form>
          ) : (
            <Card.Text>
              <h2>{comment.comment}</h2>
            </Card.Text>
          )}
          <Card.Subtitle className='mb-2 text-muted'>
            <h6>
              Posted on:
              <Moment format='MM/DD/YYYY'>{comment.createdAt}</Moment>
            </h6>
          </Card.Subtitle>
          {userInfo?._id === comment.createdBy ? (
            <>
              <Button variant='outline-success' onClick={() => setEdit(true)}>
                Edit Comment
              </Button>
              <Button
                onClick={() => dispatch(deleteComment(token, comment._id))}
                variant='outline-danger'
              >
                Delete Comment
              </Button>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </Col>
  );
};

const ConnectScreen = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsList = useSelector((state) => state.comments);
  const { loading, error, comments } = commentsList;
  const token = useSelector((state) => state.userLogin.authData);

  useEffect(() => {
    dispatch(fetchComments());
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, []);

  const userInfo = useSelector((state) => state.userDetails.userData);

  const postComment = async (e) => {
    e.preventDefault();
    console.log("post comment");
    dispatch(addComment(token, comment));
  };

  return (
    <Container fluid className='justify-content-center'>
      {!userInfo && (
        <Row className='justify-content-center'>
          <Col xs={12} sm={12} md={10} lg={8} className='text-center'>
            <Link to='/login'>
              <Button variant='outline-success'>log in to chat</Button>{" "}
            </Link>
          </Col>
        </Row>
      )}
      {userInfo && (
        <Row className='justify-content-center'>
          <Col xs={12} sm={12} md={10} lg={8} className='text-center'>
            <Form style={{ width: "100%" }} className='text-center'>
              <Form.Group controlId='comment'>
                <Form.Control
                  as='textarea'
                  placeholder='Write comment here...'
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>{" "}
              </Form.Group>{" "}
              <Button
                onClick={postComment}
                variant='outline-success'
                className='mt-3'
              >
                Post Comment
              </Button>
            </Form>{" "}
          </Col>
        </Row>
      )}

      <Row className='justify-content-center'>
        <Col sm={12} md={10} lg={8}>
          {comments &&
            comments?.map((comment) => {
              return <Comment comment={comment} />;
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectScreen;
