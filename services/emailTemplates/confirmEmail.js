const keys = require('../../config/keys');

module.exports = secret => {
  return `
        <html>
            <body>
                <div style="text-align: center;">
                <h3>Please confirm registration by visiting link below</h3>
                <p>Email confirmation Link </p>
                <div>
                <a href="${keys.clientUrl}/confirm_user/${secret}">
                  Complete registration
                </a>
                </div>
                <br>
                <p>baltfly team<p>
                </div>
            </body>
        </html>
        `;
};
