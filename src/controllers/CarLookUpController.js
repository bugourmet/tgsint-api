
const CarLookUpService = require("../services/CarLookUpService");
const cheerio = require('cheerio');


const hrLookUp = (req, res) => {
    try {
    const plates = req.query.plates;
    if (!plates ){
        res.status(400).send({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request: 'plates'",
          },
        });
      }else{
        CarLookUpService.hrCheck(plates).then(function (response) {
            res.status(201).send({ status: "OK", data: response.data })
          });
      }
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const bihLookUp = (req, res) => {
  try {
    const plates = req.query.plates;
    if (!plates ){
        res.status(400).send({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request: 'plates'",
          },
        });
      }else{
        CarLookUpService.bihCheck(plates).then(function(response){
          const load = cheerio.load(response.data);
          const match = load.text()
          //console.log(response.data);
          if(match.includes("Za traženo vozilo se ne može pronaći podatak u bazi Biroa")){
            return res.status(404).json({ message: "Vehicle Details Not Found!" });
          }else{
            const result = load('#mainForm').text();
            res.status(201).send({ status: "OK", data: result })
        }
        })
      }
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


const vinLookUp = (req, res) => {
  try {
    const vin = req.query.number;
    const month = req.query.month;
    CarLookUpService.vinCheck(vin,month).then(function (response) {
      res.status(201).send({ status: "OK", data: response.data })
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


module.exports = {
    hrLookUp,
    bihLookUp,
    vinLookUp,
};
