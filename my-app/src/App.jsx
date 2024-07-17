import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter ,Navigate,Route,Router, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import NavBar from './Components/Navbar';
import CartPage from './Pages/CartPage';
import { CheckoutForm, Return } from './Pages/CheckOutPage';
import { useSelector } from 'react-redux';



function App() {

  const {loggedIn}=useSelector(state=>state.product_data);

  console.log(loggedIn,"state from app")

  return (
    <>
     <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={ loggedIn?<CartPage />:<Navigate to='/login'/>} />
        <Route path="/checkout" element={loggedIn?<CheckoutForm />:<Navigate to="/login"/>} />
        <Route path="/return" element={loggedIn?<Return/>:<Navigate to='/login'/>} /> 
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
