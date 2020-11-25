// token confirmation
const OAuth2Client = require('google-auth')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

const googleAuth= async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    console.log(`User ${payload.name} verified`)

    const { sub, name, email } = payload;
    const userId = sub;
    return { userId, email, fullName: name }
};

module.exports = googleAuth;