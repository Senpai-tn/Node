const express = require('express');
const router =express.Router();
const Car  = require('../Models/Cars');
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        let payload;

        if (req.token === 'null') {
            return res.send('Unauthorized request')
        }
        try {
            payload = jwt.verify(req.token, process.env.token_Key);
            }
        catch (e) {
            return res.send('invalid user');
        }
        if (!payload) {
            return res.send('Unauthorized request');
        }

        decoded = jwt.decode(req.token, {complete: true});
        req.userId = decoded.payload.id;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

router.post('/add',verifyToken,async (req,res) =>
{
    res.json({ message:req.userId });
});
module.exports = router;
