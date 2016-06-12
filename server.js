var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Five = require('johnny-five'),
    Spark = require('spark-io');

var board, button, led, led2, led3, boardLed, wheelsServos;

board = new Five.Board({});

var leds = [];

board.on('ready', function () {
  button = new Five.Button(2);
  // boardLed = new Five.Led('D7');
  led = new Five.Led(3);
  led2 = new Five.Led(4);
  led3 = new Five.Led(5);
  led4 = new Five.Led(6);
  led5 = new Five.Led(7);
  led6 = new Five.Led(8);

  for (var i = 3; i < 9; i++) {
    // console.log( [i] );
    // leds.push()
  };

  button.on('down', function () {
    led.on();
    led2.on();
    led3.on();
    led4.on();
    led5.on();
    led6.on();
  });

  button.on('up', function () {
    led.off();
    led2.off();
    led3.off();
    led4.off();
    led5.off();
    led6.off();
  });

  app.get('/', function(req, res){
    res.sendfile('index.html');
  });

  io.on('connection', function ( socket ) {
    led.on();

    setTimeout( function () {
      led.off();
    }, 1000);
    console.log('a user connected');

    socket.on('location', function ( data ) {
      var distanceFrom = distance(data.split(',')[0], data.split(',')[1],'30.645029' ,'-81.455680' ,'k');
      // console.log(data.split(',')[0]);
      console.log('distance', distanceFrom );

      if ( 7 > Math.floor(distanceFrom) ) {
        console.log('obj');
        led5.on();
        led6.on();
      } else {

      }
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });

});

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2014            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var radlon1 = Math.PI * lon1/180
  var radlon2 = Math.PI * lon2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}
