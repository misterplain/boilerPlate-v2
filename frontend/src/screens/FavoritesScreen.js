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

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userLogin.authData);
  const { userData } = useSelector((state) => state.userDetails);
  const blogPosts = useSelector((state) => state.blogPosts);
  // const { loading, error, posts } = blogPosts;

  const userFavorites = userData.favorites;
  const allPosts = blogPosts.posts;
  console.log(userFavorites);
  console.log(allPosts);

  const filteredPosts = allPosts.filter((post) =>
    userFavorites.includes(post._id)
  );
  console.log(filteredPosts);

  return (
    <Container fluid id='favorites'>
      <Row className='justify-content-center'>
        <Col xs={12} className='page-title mb-3'>
          my favorites
        </Col>

        {filteredPosts &&
          filteredPosts.map((post) => {
            return (
              <Col
                xs={{ span: 10, offset: 0 }}
                sm={{ span: 5, offset: 0 }}
                md={5}
                lg={3}
                className='justify-content-center'
                key={post._id}
              >
                <Card
                  style={{
                    width: "100%",
                    border: "2px solid green",
                    padding: "1px",
                    margin: "3px",
                  }}
                  className='text-center'
                  key={post._id}
                >
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    <Button
                      variant='outline-light'
                      onClick={() => dispatch(removeFavorite(post._id))}
                      style={{ margin: "5px" }}
                    >
                      <BsHeartFill
                        style={{ color: "green", fontSize: "1.5rem" }}
                      />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default FavoritesScreen; // import React, { useEffect, useState } from "react";
// import { Row, Col, Card, Button, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// //redux
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogPosts } from "../actions/blogActions";
// import { addFavorite, removeFavorite } from "../actions/userActions";
// import { getUserDetails } from "../actions/userActions";

// const FavoritesScreen = () => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.userDetails.userData);
//   return (
//     <Container fluid>
//       {userData.favorites.length !== 0
//         ? userData.favorites.map((favorite) => {
//             return (
//               <Col key={favorite._id}>
//                 <Card key={favorite._id}>
//                   <Card.Body>
//                     <Card.Title>{favorite.title}</Card.Title>
//                     <Card.Text>{favorite.caption}</Card.Text>
//                     {/* <FavoriteButton post={favorite} /> */}
//                     <Button
//                       onClick={() => dispatch(removeFavorite(favorite._id))}
//                     >
//                       Remove Favorite
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })
//         : null}
//     </Container>
//   );
// };

// export default FavoritesScreen;
