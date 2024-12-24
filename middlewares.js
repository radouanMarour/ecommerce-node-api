import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
    }
}
export default verifyToken