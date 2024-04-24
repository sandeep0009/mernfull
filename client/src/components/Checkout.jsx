import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const token = useSelector(state => state.token.token);
  const [id, setId] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [sessionId, setSessionid] = useState(null);

  useEffect(() => {
    const handleUserId = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/getUserId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setId(res.data.userid); 
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleStrip = async () => {
      const stripeInstance = await loadStripe('pk_test_51Ot0D2SHK1Mkfv1lWbkByecODMiNiGmb2b9YixggrEOtZS9q998MCOl5IiRip6DOhQ0TMKqcXzd0J1MzS8dI70s000IL4ZFUPx');
      setStripe(stripeInstance);
    };

    handleStrip();
    handleUserId();
  }, [token]);

  useEffect(() => {
    const initiateCheckout = async () => {
      if (!stripe || !id) return;

      try {
        const res = await axios.post(
          `http://localhost:3000/api/checkout?id=${id}`, 
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.sessionId) {
          setSessionid(res.data.sessionId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    initiateCheckout();
  }, [stripe, id, token]);

  const handlePayment = async () => {
    if (!stripe || !sessionId) return;

    try {
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-96">
      <div className="grid grid-cols-1 m-auto justify-center text-white">
        <h1>Click on this button for Upgrade</h1>
        <div className="text-center">
          <button onClick={handlePayment} className=" rounded-full mt-5 bg-gray-900 text-large h-14 w-full focus:outline-none focus:ring-2 focus: focus:ring-offset-2 focus:ring-offset-gray-800">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
