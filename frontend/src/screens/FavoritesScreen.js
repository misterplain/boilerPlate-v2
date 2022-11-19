import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

// const FavoriteButton = ({ post }) => {
//   const dispatch = useDispatch();
//   const [isFavorite, setIsFavorite] = useState(false);
//   const token = useSelector((state) => state.userLogin.authData);
//   const userData = useSelector((state) => state.userDetails.userData);

//   useEffect(() => {
//     if (userData) {
//       if (userData.favorites.includes(post._id)) {
//         setIsFavorite(true);
//       }
//     }
//   }, [setIsFavorite, userData, post]);

//   return (
//     <Button
//       variant={isFavorite ? "outline-danger" : "outline-success"}
//       onClick={
//         isFavorite
//           ? () => {
//               dispatch(removeFavorite(post._id));
//               setIsFavorite(false);
//             }
//           : () => {
//               dispatch(addFavorite(post._id));
//               setIsFavorite(true);
//             }
//       }
//       style={{ margin: "5px" }}
//     >
//       {isFavorite ? "Remove Favorite" : "Add Favorite"}
//     </Button>
//   );
// };

const FavoritesScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.userLogin.authData);
  // const userData = useSelector((state) => state.userDetails.userData);
  const userData = useSelector((state) => state.userDetails.userData);
  // const blogPosts = useSelector((state) => state.blogPosts);
  // const { loading, error, posts } = blogPosts;

  // useEffect(() => {
  //   dispatch(fetchBlogPosts());
  //   if (token) {
  //     dispatch(getUserDetails(token));
  //   }
  // }, [dispatch]);

  return (
    <Container fluid>
      {userData.favorites.length !== 0
        ? userData.favorites.map((favorite) => {
            return (
              <Col key={favorite._id}>
                <Card key={favorite._id}>
                  <Card.Body>
                    <Card.Title>{favorite.title}</Card.Title>
                    <Card.Text>{favorite.caption}</Card.Text>
                    {/* <FavoriteButton post={favorite} /> */}
                    <Button
                      onClick={() => dispatch(removeFavorite(favorite._id))}
                    >
                      Remove Favorite
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        : null}
    </Container>
  );
};

export default FavoritesScreen;
