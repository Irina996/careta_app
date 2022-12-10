import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import {stripePaymentMethodHandler} from './script.js';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: 'Jenny Rosen',
      },
    });

    stripePaymentMethodHandler(result);
  };

  render() {
    const {stripe} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}