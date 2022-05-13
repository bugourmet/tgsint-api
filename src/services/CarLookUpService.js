const axios = require('axios')

const hrCheck = (plates) =>{
  try {
      result = axios.post('https://api.laqo.hr/webshop/ace/api/v1/car/details', {plateNumber: plates})
      return result;
  } catch (error) {
    throw error;
  }
  };


const bihCheck = (plates) => {
  try {
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fullDate = `${day}.${month}.${year}`;

    const result = axios.post(
      'https://www.bzkbih.ba/ba/stream.php',
      new URLSearchParams({
          'searchRegNr': plates,
          'searchDate': fullDate,
          'third_email': '',
          'action': 'doSearch',
          'mode': 'print',
          'btnSearch': 'TRAZI'
      }),
      {
          params: {
              'kat': '82'
          },
          headers: {
              'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',}
      }
  );
      return result
  } catch (error) {
    throw error;
  }
  };


const vinCheck = (vin,month) => {
  try {
    const result = axios.post(
      'https://www.cvh.hr/Umbraco/Surface/TabsSurface/mot',
      new URLSearchParams({
          'VIN': vin,
          'month': month
      }),
      {
          headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          }
        });
        return result
  } catch (error) {
    throw error;
  }
};


module.exports = {
  hrCheck,
  bihCheck,
  vinCheck,
};