import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  Navigate
} from "react-router-dom";
import './checkOut.css'
import { CompleteOrderApi } from "../utilites/globalApi";
import { useSelector } from "react-redux";




const stripePromise = loadStripe("pk_test_51PcrliAUE7Zx9xDkdDTC5jcS4qLHnWifrXllGGgvjHlvgYsLVk0LPODQ0MkE70nWifALuckF2Q1IsxPaIneNrLSH00M3I6a2Tf");



export const CheckoutForm = () => {
   
const totalAmount=useSelector(state=>state.cart.total);

const fixed=Number(totalAmount*100)

  const fetchClientSecret = useCallback(async() => {

    try {
        
        const res = await fetch("http://localhost:3000/api/order/v1/create-checkout-session", {
            method: "POST",
            headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount:fixed, }),
      credentials: 'include'
        },
      
      )

        const responseBody = await res.json();
        

        if (typeof responseBody.clientSecret === 'string') {
            return responseBody.clientSecret;
          } else {
           
            throw new Error('Client secret is not a string');
          }

    } catch (error) {
     
        console.log(error);
        throw new Error('Failed to fetch client secret');
    }
   
  }, []);


  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}



export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   
    const sessionId = urlParams.get('session_id');




    fetch(`http://localhost:3000/api/order/v1/session-status?session_id=${sessionId}`,{
      method: 'GET',
      credentials: 'include' 
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

      }).catch((err)=>{
        console.log(err,"something went wrong")
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {

   const data=async()=>{
    try {
      const res= await CompleteOrderApi();
      console.log(res,"from return page");
      
    } catch (error) {
      
      console.log(error);
    }


   }

   data();

    return (
      <section id="success" className="payment_success_page">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

