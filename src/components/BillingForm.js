import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import "./BillingForm.css";

class BillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      storage: "",
      isProcessing: false,
      isCardComplete: false
    };
  }

  validateForm() {
    return (
      this.state.name !== "" &&
      this.state.storage !== "" &&
      this.state.isCardComplete
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    });
  }

  handleSubmitClick = async event => {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ isProcessing: true });

    const { token, error } = await this.props.stripe.createToken({ name });

    this.setState({ isProcessing: false });

    this.props.onSubmit(this.state.storage, { token, error });
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading;

    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <FormGroup bsSize="large" controlId="storage">
          <ControlLabel>Storage</ControlLabel>
          <FormControl
            min="0"
            type="number"
            value={this.state.storage}
            onChange={this.handleFieldChange}
            placeholder="Number of notes to store"
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="name">
          <ControlLabel>Cardholder&apos;s name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={this.handleFieldChange}
            placeholder="Name on the card"
          />
        </FormGroup>
        <ControlLabel>Credit Card Info</ControlLabel>
        <CardElement
          className="card-field"
          onChange={this.handleCardFieldChange}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
          }}
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Purchase"
          isLoading={loading}
          loadingText="Purchasing…"
          disabled={!this.validateForm()}
        />
      </form>
    );
  }
}

export default injectStripe(BillingForm);


// To begin with we are going to wrap our component with a Stripe module using the injectStripe HOC. This gives our component access to the this.props.stripe.createToken method.
//
// As for the fields in our form, we have input field of type number that allows a user to enter the number of notes they want to store. We also take the name on the credit card. These are stored in the state through the this.handleFieldChange method.
//
// The credit card number form is provided by the Stripe React SDK through the CardElement component that we import in the header.
//
// The submit button has a loading state that is set to true when we call Stripe to get a token and when we call our billing API. However, since our Settings container is calling the billing API we use the this.props.loading to set the state of the button from the Settings container.
//
// We also validate this form by checking if the name, the number of notes, and the card details are complete. For the card details, we use the CardElement’s onChange method.
//
// Finally, once the user completes and submits the form we make a call to Stripe by passing in the credit card name and the credit card details (this is handled by the Stripe SDK). We call the this.props.stripe.createToken method and in return we get the token or an error back. We simply pass this and the number of notes to be stored to the settings page via the this.props.onSubmit method. We will be setting this up shortly.
