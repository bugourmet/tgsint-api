import axios from 'axios';
import constants from '../utils/const.mjs';

const hrCheck = async (plates) => {
  if (!plates) {
    throw new Error(constants.errors.NO_PLATES);
  }

  const result = await axios.post(
    'https://api.laqo.hr/webshop/ace/api/v1/car/details',
    {
      plateNumber: plates,
    }
  );
  return result;
};

const bihCheck = async (plates) => {
  if (!plates) {
    throw new Error(constants.errors.NO_PLATES);
  }

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}.${month}.${year}`;

  const result = await axios.post(
    'https://www.bzkbih.ba/ba/stream.php',
    new URLSearchParams({
      searchRegNr: plates,
      searchDate: fullDate,
      third_email: '',
      action: 'doSearch',
      mode: 'print',
      btnSearch: 'TRAZI',
    }),
    {
      params: {
        kat: '82',
      },
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      },
    }
  );
  return result;
};

const vinCheck = async (vin, month) => {
  const result = await axios.post(
    'https://www.cvh.hr/Umbraco/Surface/TabsSurface/mot',
    new URLSearchParams({
      VIN: vin,
      month: month,
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
  );
  return result;
};

export default {
  hrCheck,
  bihCheck,
  vinCheck,
};
