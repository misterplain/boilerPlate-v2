import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import ContactScreen from "./screens/ContactScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='*' element={<Navigate replace to='/' />} />{" "}
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/chat' element={<ChatScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/favorites' element={<FavoritesScreen />} />
            {/* <Route path='/users' element={<UsersScreen />} /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
