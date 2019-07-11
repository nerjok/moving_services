import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
 class Payment extends Component {
    render(){
        return (
                <StripeCheckout
                  name="Emaily"
                  description="for email credits"
                  amount={56}
                  token={(token) => this.props.handleToken(token)}
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                <button className="stickie-nav__menu-link" style={{display: 'inline'}}>Add Credits</button>
                </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payment)