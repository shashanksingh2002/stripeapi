const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { updateUserTransaction, deleteTransaction } = require('../database/database');

module.exports = {
    checkoutStripe: async(req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
               {
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name: req.body.plan+" "+req.body.type
                        },
                        unit_amount: req.body.price*100
                    },
                    quantity:1
               }
            ],
            mode: 'payment',
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/subscription`,
          });
          await updateUserTransaction(session,req.body.plan,req.body.type);
          return res.json(session);
          
    },
    refundStripe: async(req,res) => {
       await deleteTransaction(req.body.id);
       res.json('Refund Initiated');
    }
};
