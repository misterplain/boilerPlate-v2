import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { BsHeart, BsHeartFill } from "react-icons/bs";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

const FavoriteButton = ({ post }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const token = useSelector((state) => state.userLogin.authData);
  const userData = useSelector((state) => state.userDetails.userData);

  useEffect(() => {
    if (userData) {
      if (userData.favorites.includes(post._id)) {
        setIsFavorite(true);
      }
    }
  }, [setIsFavorite, userData, post]);

  return (
    <Button
      variant='outline-light'
      onClick={
        isFavorite
          ? () => {
              dispatch(removeFavorite(post._id));
              setIsFavorite(false);
            }
          : () => {
              dispatch(addFavorite(post._id));
              setIsFavorite(true);
            }
      }
      style={{ margin: "5px" }}
    >
      {isFavorite ? (
        <BsHeartFill style={{ color: "green", fontSize: "1.5rem" }} />
      ) : (
        <BsHeart style={{ color: "green", fontSize: "1.5rem" }} />
      )}
    </Button>
  );
};

const InformScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userLogin.authData);
  const userData = useSelector((state) => state.userDetails.userData);
  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;

  useEffect(() => {
    dispatch(fetchBlogPosts());
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {posts &&
          posts.map((post) => {
            return (
              <Col key={post._id}>
                <Card key={post._id}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    {userData && <FavoriteButton post={post} />}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default InformScreen;
