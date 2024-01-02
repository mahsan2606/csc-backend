const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    jwt.verify(token, 'Sumedh And Ahsan Innovation', (err, user) => {
        console.log(user)
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
module.exports = authenticateToken

