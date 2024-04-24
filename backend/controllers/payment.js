import User from "../models/userSchema.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE);

export const checkout = async (req, res) => {
    try {
        const id = req.query.id;
        const existingUser = await User.findById(id);
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
