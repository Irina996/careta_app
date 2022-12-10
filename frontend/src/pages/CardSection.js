/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import './Styles.css'
import { Col, Container } from 'react-bootstrap';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
    <Container>
    <div className="d-flex justify-content-center mt-3">
      <h3>Payment</h3>
    </div>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </Container>
  );
};
export default CardSection;