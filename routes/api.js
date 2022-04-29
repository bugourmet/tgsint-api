const express = require('express');
const Person = require('../models/person');
const router = express.Router();
const whois = require('whoiser')
var request = require('request');
const execFile = require('child_process').execFile;


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


router.get('/carlookup/', async (req,res) => {
    try{
        var plates = req.query.plates;
        var clientServerOptions = {
            uri: 'https://api.laqo.hr/webshop/ace/api/v1/car/details',
            body: JSON.stringify({ plateNumber: plates }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions, function (error, response) {
            if (error) {
                res.status(404).json({message: error});
            };
        
            if (!error) {
                if(response.body.includes("Vehicle Details Not Found")){
                    try{
                        return res.status(404).send(JSON.parse(response.body));
                    }catch(err){
                        return res.status(500).json({ message: "server error" }); 
                    }
                    
                }else{
                    try{
                        return res.status(200).send(JSON.parse(response.body));
                    }catch(err){
                        return res.status(500).json({ message: "server error" }); 
                    }
                }
            };
        
        });
    }catch(err){
        //console.log(err)
        return res.status(500).json({ message: err });
    }

})

router.get('/nmap', (req, res) => {
    var target = req.query.target;
    var option = req.query.option;
    var command = `nmap`;
    var args = [];

    if(target.length == 0){
        res.status(500).json({message : "Target not specified"});
    }else{
        switch(option) {
            case "1":  
                // quicktraceroute
                args = ["-sn","--traceroute", target];
                break;
            case "2":  
                // intense_scan
                args = ["-T4","-A","-v", target];
                break;
            case "3":
                // intense_scan_udp
                args = ["-sS","-sU","-T4","-A","-v", target];
                break;
            case "4":
                // intense_scan_alltcp
                args = ["p","1-65535","-T4","-A","-v", target];
                break;
            case "5":
                // intense_scan_no_ping
                args = ["-T4","-A","-v","-Pn", target];
                break;
            case "6":
                // pingscan
                args = ["-sn", target];
                break;    
            case "7":
                // quickscan
                args = ["-T4","-F", target];
                break;
            case "8":
                // quickscan_plus
                args =  ["-sV","-T4","-O","-F","--version-light", target];
                break;
            case "9":
                // subdomain scan via crt-sh
                args = ["-sn","--script","hostmap-crtsh", target];
                break;
            default:
                //ping scan
                args = ["-sn",target];
        }

    execFile(command, args, (err, output) => {
        if (err) {
          res.status(500).json({message:err});
        }
          res.status(200).json({result:output});
      });
    }
  });


module.exports = router;