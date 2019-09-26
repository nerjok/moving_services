const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys')
        sgMail.setApiKey(keys.sendGridKey);
const forgotPassword = require('./emailTemplates/forgotPassword');



class PasswordMail  {

    constructor({subject, password_reset}, content) {


        this.from_email = 'no-reply@email.com';
        this.mail_to = 'neriejus@gmail.com';
        this.subject = subject;
        this.password_reset = password_reset

    }

    async send() {

        const msg = {
            to: this.mail_to,
            from: this.from_email,
            subject: this.subject,
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            html: forgotPassword(this.password_reset)
          };
          sgMail.send(msg);

/*
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    */
    }

}

module.exports = PasswordMail;
