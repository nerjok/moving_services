const keys = require('../../config/keys');

module.exports = secret => {
  return `
        <html>
            <body>
                <div style="text-align: center;">
                <h3>Please follow instructions bellow to reset password</h3>
                <p>Please answer the following question</p>
                <div>
                <a href="${keys.clientUrl}/reset_password?type=${secret}">Reset Password</a>
                </div>
                <br>
                <p>baltfly team<p>
                </div>
            </body>
        </html>
        `;
};
