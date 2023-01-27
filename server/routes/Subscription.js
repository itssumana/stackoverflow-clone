import express from "express";
// import auth from "../middlewares/auth";

const router = express.Router()
const YOUR_DOMAIN = 'https://stackoverflow-clone-app-sumana.netlify.app/Subscription';


router.post('/create-checkout-session', async(req,res)=>{
    const {priceId} = req.body.priceValue;
    // const prices = await stripe.prices.list({
    //     lookup_keys: [req.body.priceValue],
    //     expand: ['data.product'],
    // });
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        currency: 'INR',
        billing_address_collection: 'auto',
        line_items: [
          {
            // price: prices.data[0].id,
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
    
          },
        ],
        success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    
    res.redirect(303, session.url);
})

export default router