const express = require('express');
const Person = require('../models/person');
const router = express.Router();



//submit the user to the DB
router.post('/',async (req,res) => {
        const post = new Person({
        phonenum: req.body.phonenum,
        fbid: req.body.fbid,
        name: req.body.name,
        surname: req.body.surname,
        sex: req.body.sex,
        extra: req.body.extra
    });

    try{
        const savedPerson = await post.save();
        res.json(savedPerson);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


//find a specific user
router.get('/:num', async (req,res) => {
    try{
        const post = await Person.find({'phonenum': req.params.num});
        res.json(post);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }


})

module.exports = router;

