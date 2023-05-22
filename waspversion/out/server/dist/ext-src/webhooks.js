import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2022-11-15',
});
export const stripeWebhook = async (request, response, context) => {
    console.log('\n\n <<<< custome webhook route >>>> \n\n');
    let event = request.body;
    let userStripeId = null;
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent.customer);
        userStripeId = paymentIntent.customer;
        if (paymentIntent.amount === 295) {
            console.log('paymentIntent.amount', paymentIntent.amount);
            await context.entities.User.updateMany({
                where: {
                    stripeId: userStripeId,
                },
                data: {
                    credits: {
                        increment: 10,
                    },
                },
            });
        }
    }
    else {
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
};
//# sourceMappingURL=webhooks.js.map