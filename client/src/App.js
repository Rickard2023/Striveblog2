import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import "./App.css"
import Button from 'react-bootstrap/Button';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import test from "./test.js"
import Register from './components/register.jsx';
import Userlist from './components/userlist.jsx';
import UserPage from './components/userpage.jsx';
import Login from './components/login.jsx';


const Home = () => (

    <div>
      HOME
  </div>
);

const Categories = () => (
  <div>
    <h2>Categories</h2>
    <p>Browse items by category.</p>
  </div>
);

const Products = () => (
  <div>
    <h2>Products</h2>
    <p>Browse individual products.</p>
  </div>
);



export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/userlist/me" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}