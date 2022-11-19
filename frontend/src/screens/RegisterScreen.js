import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/authActions";
//form validation yup and formik
import * as Yup from "yup";
import { Formik } from "formik";

const RegisterScreen = ({ match, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, registerError, authData } = userLogin;

  const registerSchema = Yup.object({
    username: Yup.string().required("Please provide a username"),
    email: Yup.string().required("Please provide an email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please provide a password of at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  useEffect(() => {
    if (authData) {
      navigate("/");
    }
  }, [authData, navigate]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   //dispatch register
  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match");
  //   } else {
  //     dispatch(register(username, email, password));
  //   }
  // };
  return (
    <>
      <Container fluid>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h2 class='text-center'>Sign Up</h2>
          </Col>
          <Col xs={10}>
            <FormContainer>
              {registerError && <Message variant='danger'>{registerError}</Message>}
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values) => dispatch(register(values.username, values.email, values.password))}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlue,
                  values,
                  isValid,
                  errors,
                  touched,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group hasValidation controlId='username'>
                      <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                        style={{ width: "90%", margin: "auto" }}
                        className='mt-3'
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group hasValidation controlId='email'>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                        style={{ width: "90%", margin: "auto" }}
                        className='mt-3'
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      hasValidation
                      controlId='password'
                      className='mt-3'
                    >
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                        style={{ width: "90%", margin: "auto" }}
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      hasValidation
                      controlId='confirmPassword'
                      className='mt-3'
                    >
                      <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        style={{ width: "90%", margin: "auto" }}
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-grid gap-2 mt-3'>
                      <Button type='submit' variant='outline-success'>
                        Register
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormContainer>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col xs={12} className='text-center'>
            Have an Account?
            <Link to='/login'>
              <Button variant='outline-dark' size='sm'>
                Log In
              </Button>
            </Link>
          </Col>
        </Row>{" "}
      </Container>
    </>
    // <FormContainer>
    //   <h1>Sign Up</h1>
    //   {message && <Message variant='danger'>{message}</Message>}
    //   {error && <Message variant='danger'>{error}</Message>}
    //   {loading && <Loader />}

    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId='name'>
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type='name'
    //         placeholder='Enter name'
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId='email'>
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Enter email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId='password'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Enter password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId='confirmPassword'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Confirm password'
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Button type='submit' variant='primary'>
    //       Register
    //     </Button>
    //   </Form>
    //   <Row className='py-3'>
    //     <Col>
    //       Have an Account? <Link to='/login'>Login</Link>
    //     </Col>
    //   </Row>
    // </FormContainer>
  );
};

export default RegisterScreen;
