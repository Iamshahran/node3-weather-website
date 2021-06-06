const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6d72d86e6220792e578783f981088b63&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions} throughout the day. It's ${body.current.temperature} degree, but it feels like ${body.current.feelslike} degree`
      );
    }
  });
};

module.exports = forecast;
