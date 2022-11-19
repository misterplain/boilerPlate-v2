import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
//redux
import { login } from "../actions/authActions";
//form validation yup and formik
import * as Yup from "yup";
import { Formik } from "formik";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Field required")
    .min(10, "Email must be at least 5 characters"),
  password: Yup.string()
    .min(6)
    .required("Please provide a password of at least 6 characters"),
});

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, loginError, authData } = userLogin;

  useEffect(() => {
    if (authData) {
      navigate("/");
    }
  }, [navigate, authData]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(login(email, password));
  // }

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   loginSchema,
  //   onSubmit: (values, { resetForm }) => {
  //     console.log(formik.errors);
  //     dispatch(login(email, password));
  //   },
  // });

  return (
    <>
      <Container fluid>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h2 class='text-center'>Sign In</h2>
          </Col>

          <Col xs={10}>
            <FormContainer>
              {loginError && <Message variant='danger'>{loginError}</Message>}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values) => dispatch(login(values.email, values.password))}
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
                    <Form.Group hasValidation controlId='email'>
                      {/* <Form.Label>Email Address</Form.Label> */}
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                        style={{ width: "90%", margin: "auto" }}
                      ></Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                    <Form.Group
                      hasValidation
                      controlId='password'
                      className='mt-2'
                    >
                      {/* <Form.Label>Password</Form.Label> */}
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
                    <div className='d-grid gap-2 mt-3'>
                      <Button type='submit' variant='outline-success'>
                        Sign In
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
            New Customer?{" "}
            <Link to='/register'>
              <Button variant='outline-dark' size='sm'>
                Register
              </Button>
            </Link>
          </Col>
        </Row>{" "}
      </Container>
    </>
  );
};

export default LoginScreen;
