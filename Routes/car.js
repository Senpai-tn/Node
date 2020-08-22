const express = require('express');
const router =express.Router();
const Car  = require('../Models/Cars');

router.post('/add',async (req,res) =>
{
    console.log(req.body);
});
module.exports = router;
