const express = require('express');
const router =express.Router();
const User  = require('../Models/User');
var bcrypt = require('bcryptjs');
// localhost:3000/api/users/register
router.post('/register',async (req,res) =>
{
    console.log(req.body);
    let user=new User({
        FirstName : req.body.FirstName,
        LastName :req.body.LastName,
        email :req.body.email,
        password :req.body.password,
        enabled : true,
    });
    try{
        const NewUser =await User.find({ email : req.body.email }); // check if user existes
        if (NewUser === undefined || NewUser.length == 0 )
        {
            var salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt); // password hash
            user = await user.save();                             // save the user
            res.json({status:"ok" , message: 'Account Create ! You can now Login'});
            return ;
        }
        res.json({status:"err" , message: 'Email Already Exists'});
    }catch (err) {
        res.json({ status:"err" , message:err.message });
    }

});
// localhost:3000/api/users/login
router.post('/login',async (req,res) =>
{
    try{
        // await new Promise(resolve => setTimeout(resolve, 5000));
        const NewUser =await User.find({ email : req.body.email  }).limit(1);
        //await sleep(2000);
        if (NewUser.length < 1)
        {
            await res.json({status: "err", message: 'Email Does not Exists'});
            return ;
        }
        if (!bcrypt.compareSync( req.body.password,NewUser[0].password))
        {

            await res.json({status:"err" , message: 'Wrong Paswword'});
            return ;
        }
        if (NewUser[0].enabled === 0 )
        {
            await res.json({status:"err" , message: 'User is Disabled'});
            return ;
        }
        var payload = {
            id: NewUser[0]._id,
        };
        res.json({status:"ok" , message: 'Welcome Back', UserData : NewUser , token:123});
    }catch (err) {
        res.json({ status:"err" ,message:err.message });
    }
});
module.exports = router;
