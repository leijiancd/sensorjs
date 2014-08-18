'use strict';
var connect = require('../'),
   sensorApp = connect.sensor,
   ble = sensorApp.getNetwork('ble');

var app = connect().
  use(function (data, next) {                // custom middleware
    console.log('accelerometer=', data.value);
    next();
  }).
  use(connect.queue(100));                   // buffering max # of 100.

ble.discover('sensorTagAcc'/* sensor driver name(or profile name) */, function (err, devices) {
  devices.forEach(function (device) {
    device.sensorUrls.forEach(function (sensorUrl) {
      app.listen(sensorApp.createSensor(sensorUrl));
    });
  });
});
