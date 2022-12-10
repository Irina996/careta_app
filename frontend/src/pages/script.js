import stripe from "./Stripe.js";

export const stripePaymentMethodHandler = async (result) => {
    if (result.error) {
      // Show error in payment form
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      const res = await fetch('/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        }),
      })
      const paymentResponse = await res.json();
  
      // Handle server response (see Step 4)
      handleServerResponse(paymentResponse);
    }
}

const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe.handleCardAction(response.payment_intent_client_secret);
  
      if (errorAction) {
        // Show error from Stripe.js in payment form
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch('/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_intent_id: paymentIntent.id })
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      // Show success message
    }
  }