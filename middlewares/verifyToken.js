const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        const token = authorization.split(' ')[1];

        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid 2"
                }
            );
        }

        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Invalid Token"
            }
        );
    }
}

module.exports = verifyToken;