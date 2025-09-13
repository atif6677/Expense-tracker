const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // init client
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = { email: 'mohd.atif2531@gmail.com' }; 
    const receivers = [{ email }];

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Reset your password',
      textContent: `Hi, You requested a password reset. This is a dummy mail for now.`,
    });

    res.json({ message: 'Reset email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = forgotPassword;