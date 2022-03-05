const express = require('express');
const Person = require('../models/person');
const router = express.Router();


//save the user to the DB
router.post('/',async (req,res) => {
        const user = new Person({
        phonenum: req.body.phonenum,
        fbid: req.body.fbid,
        name: req.body.name,
        surname: req.body.surname,
        sex: req.body.sex,
        extra: req.body.extra
    });

    try{
        const savedPerson = await user.save();
        res.json(savedPerson);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


//find a specific user by phone number
router.get('/phone/', async (req,res) => {
    try{
        const userdata = await Person.find({'phonenum': req.query.number});
        if(userdata === undefined || userdata.length == 0){
            return res.status(200).json({ error: "User not found!" });
        }else{
            res.json(userdata);
        }

        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})


//find a specific user by name and surname
router.get('/find/', async (req,res) => {
    try{
        const user = await Person.find({'name': { $regex: req.query.name,'$options' : 'i'},'surname':{ $regex: req.query.surname,'$options' : 'i'}}); //case insensitive search w/ regex
        if(user === undefined || user.length == 0){
            return res.status(200).json({ error: "User not found!" });
        }else{
            res.json(user);
        }

        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})


module.exports = router;

