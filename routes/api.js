const express = require('express');
const Person = require('../models/person');
const router = express.Router();
const nmap = require('node-nmap');
const whois = require('whoiser')

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
        var phonenumber = req.query.number;
        if(phonenumber.length == 0 || phonenumber.length < 10){
            return res.status(200).json({ error: "Check phone number" });
        }else{
            const userdata = await Person.find({'phonenum': phonenumber});
            if(userdata === undefined || userdata.length == 0){
                return res.status(200).json({ error: "User not found!" });
            }else{
                return res.status(200).json(userdata);
            }
        }
        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})


//find a specific user by name and surname
router.get('/find/', async (req,res) => {
    try{
        if(req.query.name.length < 2 || req.query.surname.length < 2 || req.query.name == null || req.query.surname == null || req.query.name == "" || req.query.surname == ""){
            return res.status(200).json({ error: "Your name/surname parameter is too short!" });
        }
        else{
            const user = await Person.find({'name': { $regex: req.query.name,'$options' : 'i'},'surname':{ $regex: req.query.surname,'$options' : 'i'}});
            if(user === undefined || user.length == 0){
                return res.status(200).json({ error: "User not found!" });
            }else{
                return res.status(200).json(user);
            }
        }
        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})


// quick nmap scan
router.get('/qscan/', async (req,res) => {
    try{
        var target = req.query.target;
        if(target.length == 0){
            return res.status(200).json({ error: "Check target format!" });
        }else{
            let scan = new nmap.QuickScan(target);

            scan.on('complete', function(data){
                return res.status(200).json(data);
              });
              
              scan.on('error', function(error){
                console.log(error);
                return res.status(200).json({ error: error });
              });
              
              scan.startScan();

        }
        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: err });
    }

})


// scan with options | works but requires further testing and swapping with queuedscans
router.get('/scan/', async (req,res) => {
    try{
        var target = req.query.target;
        var option = req.query.option;
        console.log(option);
        if(target.length == 0){
            return res.status(200).json({ error: "Check target format!" });
        }else{
            let scan = new nmap.NmapScan(target,option);
            scan.on('complete', function(data){
                //var time = scan.scanTime;
                //console.log("total scan time(ms): " + time);
                return res.status(200).json(data);
              });
              
              scan.on('error', function(error){
                console.log(error);
                return res.status(200).json({ error: error });
              });
              
              scan.startScan();

        }
        
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})

router.get('/whois/', async (req,res) => {
    try{
        var domain = req.query.domain;
        const domainInfo = await whois(domain)
        return res.status(200).json(domainInfo);
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: "" });
    }

})


module.exports = router;




//TODO
// - nmap queued scans
// - ?nmap package improvements
// - subdomains finder api
// - ?geoip api