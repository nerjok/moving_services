const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'charging',
      source: req.body.id
    });

    // eslint-disable-next-line require-atomic-updates
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });

};