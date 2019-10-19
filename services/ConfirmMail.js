const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);
const confirmMail = require('./emailTemplates/confirmEmail');



class ConfirmMail  {

  constructor({user_id}) {


    this.from_email = 'no-reply@email.com';
    this.mail_to = 'neriejus@gmail.com';
    this.subject = 'Email confirmation';
    this.user_id = user_id;

  }

  async send() {

    const msg = {
      to: this.mail_to,
      from: this.from_email,
      subject: this.subject,
      text: 'and easy to do anywhere, even with Node.js',
      html: confirmMail(this.user_id)
    };
    sgMail.send(msg);
  }

}

module.exports = ConfirmMail;
