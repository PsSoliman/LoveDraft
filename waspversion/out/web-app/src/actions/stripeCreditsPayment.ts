import { createAction } from './core'
import { StripeCreditsPayment } from '../../../server/src/actions/stripeCreditsPayment'

const action = createAction<StripeCreditsPayment>(
  'operations/stripe-credits-payment',
  ['User'],
)

export default action
