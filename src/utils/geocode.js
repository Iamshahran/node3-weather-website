const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?types=address&access_token=pk.eyJ1IjoiaXNoZWhyYW4iLCJhIjoiY2tvbXE0ZWc3MDRvejJwcGQ2ZDB1cHRzMCJ9.LQuXd64vkupWqqTay8h5nQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect with geo location", undefined);
    } else if (body.features.length === 0) {
      callback("Location not Found", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
