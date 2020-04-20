const request = require("request");

const getweather = (long , lat, callBack) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=5eeb0683fc2e551ed03be05095fd6dd9`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      return callBack(error, undefined);
    } else if (body.message) {
      return callBack(body.message, undefined);
    }
    callBack(undefined,{
        address : body.timezone,
        temperature : body.current.temp,
        sky : body.current.weather[0].description
    })
  });
};

module.exports = getweather;
