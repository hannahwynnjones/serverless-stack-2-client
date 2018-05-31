import React, { Component } from "react";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import config from "../config";
import "./Settings.css";


export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Settings">
        <StripeProvider apiKey={config.STRIPE_KEY}>
          <Elements>
            <BillingForm
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}


// We are adding the BillingForm component that we previously created here and passing in the loading and onSubmit prop that we referenced in the last chapter. In the handleFormSubmit method, we are checking if the Stripe method from the last chapter returned an error. And if things looked okay then we call our billing API and redirect to the home page after letting the user know.
//
// An important detail here is about the StripeProvider and the Elements component that we are using. The StripeProvider component let’s the Stripe SDK know that we want to call the Stripe methods using config.STRIPE_KEY. And it needs to wrap around at the top level of our billing form. Similarly, the Elements component needs to wrap around any component that is going to be using the CardElement Stripe component.


//test card: 4242 4242 4242 4242
