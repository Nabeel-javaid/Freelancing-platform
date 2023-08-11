import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm.js";
import { useCookies } from 'react-cookie';
  const stripePromise = loadStripe("pk_test_51NGGESJjeYyIXeQZ9gDCqWXPhfPqG3XSbZorMG1AosSYU4kSP9WzLfLlBLTFmTdDbjMggA9lkH4JSqkGJ6KMFJ5V001ZZTzlcy");



const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies(['accessToken']);
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(`/service/create-payment-intent/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.log('Response does not contain clientSecret:', data);
          }
        } else {
          console.log('Request failed with status:', response.status);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };
  
    makeRequest();
  }, [ cookies.accessToken, id]);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;