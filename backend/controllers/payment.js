import user from "../models/userSchema.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE);

export const checkout = async (req, res) => {
    try {
        const id = req.query.id;
        const existingUser = await user.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            
            line_items: [
                {
                    price:'price_1P7ICLSHK1Mkfv1lNrMuvqCs',
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            success_url: 'http://localhost:3000/api/createNote' 
        });

        existingUser.upgradeId=session.id;
        await existingUser.save();
        return res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const webhook = async (req, res) => {
    const sig = req.headers[process.env.EndpointSecret]; 

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.sendStatus(400); 
    }

    
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const customerId = paymentIntent.customer;

            try {
                const user = await user.findOne({ customerId });

                if (user) {
                    await user.findByIdAndUpdate(user._id, { isSubscribed: true });
                    console.log(`User ${user._id} is now subscribed.`);
                } else {
                    console.error(`User with customer ID ${customerId} not found.`);
                }
            } catch (error) {
                console.error('Error updating user subscription status:', error);
            }
            break;
  
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    res.sendStatus(200); 
};