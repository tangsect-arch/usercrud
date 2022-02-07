const crypto = require('crypto');
exports.passwordEncrypt = (req, res) => {
    const secret = process.env.SECRET_CRYPTO;
    const hash = crypto.createHmac('sha256', secret)
                       .update('I love cupcakes')
                       .digest('hex');
    res.send({message:hash})
};