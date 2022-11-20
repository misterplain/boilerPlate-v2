import React, { useState } from "react";
import { COLLAB } from "../shared/collab";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../api/axios";
//form validation
import * as Yup from "yup";
import { Formik } from "formik";

const collab = COLLAB;

const collabSchema = Yup.object({
  name: Yup.string()
    .min(3, "Your name should have more than 3 characters")
    .required("Required"),
  phoneNum: Yup.string().min(
    9,
    "Phone number should have more than 9 characters, please include country code"
  ),
  email: Yup.string().min(3, "Too short").required("Required"),
  message: Yup.string()
    .min(2, "You can do better than that")
    .required("Required"),
});

const CollabScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container className='justify-content-center text-center'>
      <Row className='justify-content-center mb-3'>
        <Col xs={10} sm={10} md={8} lg={8}>
          <Formik
            initialValues={{ name: "", phoneNum: "", email: "", message: "" }}
            validationSchema={collabSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                let data = {
                  name: values.name,
                  phoneNum: values.phoneNum,
                  email: values.email,
                  message: values.message,
                };
                // setBool(true);
                const res = await axios.post("/collab", data);
                if (
                  data.name.length === 0 ||
                  data.phoneNum.length === 0 ||
                  data.email.length === 0
                ) {
                  console.log(res.data.message);
                  // setBool(false);
                } else if (res.status === 200) {
                  console.log(res.data.message);
                  // setBool(false);
                }
              } catch (error) {
                console.log(error);
              }

              resetForm();
              setShowModal(true);
            }}
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
              <Form
                onSubmit={handleSubmit}
                style={{ padding: "20px", border: "1px solid #000" }}
              >
                <Form.Group hasValidation className='mb-3' controlId='name'>
                  <Form.Control
                    type='text'
                    placeholder='Name'
                    value={values.name}
                    onChange={handleChange}
                    style={{ width: "90%" }}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group hasValidation className='mb-3' controlId='phoneNum'>
                  <Form.Control
                    type='text'
                    placeholder='Phone Number (optional)'
                    value={values.phoneNum}
                    onChange={handleChange}
                    isInvalid={touched.phoneNum && !!errors.phoneNum}
                    style={{ width: "90%" }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.phoneNum}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group hasValidation className='mb-3' controlId='email'>
                  <Form.Control
                    type='text'
                    placeholder='Email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                    style={{ width: "90%" }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group hasValidation className='mb-3' controlId='message'>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    placeholder='Message'
                    value={values.message}
                    onChange={handleChange}
                    isInvalid={touched.message && !!errors.message}
                    style={{ width: "93%" }}
                  />{" "}
                  <Form.Control.Feedback type='invalid'>
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Modal
        size='sm'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>
            Sent successfully
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you!</Modal.Body>
      </Modal>
    </Container>
  );
};

export default CollabScreen;
