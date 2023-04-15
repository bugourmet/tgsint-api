import axios from "axios";

export default class PlatesService {
  public async croCheck(plates: string) {
    const result = await axios.get(
      `https://api.laqo.hr/webshop/backend/vehicle-api/v2/vehicles?plateNumber=${plates}`,
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );

    return result.data;
  }

  public async bihCheck(plates: string) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day}.${month}.${year}`;

    const result = await axios.post(
      "https://www.bzkbih.ba/ba/stream.php",
      new URLSearchParams({
        searchRegNr: plates,
        searchDate: fullDate,
        third_email: "",
        action: "doSearch",
        mode: "print",
        btnSearch: "TRAZI",
      }),
      {
        params: {
          kat: "82",
        },
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        },
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );

    return result.data;
  }

  public async vinCheck(vin: string, month: string) {
    const result = await axios.post(
      "https://www.cvh.hr/Umbraco/Surface/TabsSurface/mot",
      new URLSearchParams({
        VIN: vin,
        month: month,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );

    return result?.data;
  }
}
