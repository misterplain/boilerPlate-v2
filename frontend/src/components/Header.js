import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
  Button,
  Form,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { logout } from "../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const logoutAndRedirect = () => {
    dispatch(logout());
    navigate("/login");
    setShow(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { authData } = userLogin;

  const [show, setShow] = useState(false);

  const handleClose = () => show && setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <header>
      <Navbar key='sm' bg='light' expand='sm' className='mb-3'>
        <Container fluid>
          <Navbar.Brand href='#'>MERN-BoilerPlate</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-sm`}
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement='end'
            show={show}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                MERN-BoilerPlate
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className='justify-content-end flex-grow-1 pe-3'
                collapseOnSelect
              >
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/chat'>
                  Chat
                </Nav.Link>
                <Nav.Link as={Link} to='/contact'>
                  Contact
                </Nav.Link>
                {authData ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/favorites'
                      style={{ color: "purple" }}
                    >
                      Favorites
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      to='/logout'
                      onClick={logoutAndRedirect}
                      style={{ color: "purple" }}
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to='/login'
                      onSelect={() => setShow(false)}
                      style={{ color: "purple" }}
                    >
                      Login
                    </Nav.Link>
                  </>
                )}
                {/* <NavDropdown
                  title='Dropdown'
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action4'>
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action5'>
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-success'>Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </header>
  );
};

export default Header;
