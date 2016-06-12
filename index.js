var Five = require('johnny-five'),
    Spark = require('spark-io');

var board, button, led, led2, led3, boardLed, wheelsServos;

board = new Five.Board({
  // io: new Spark({
  //   token: 'f7175a25f5a8352ce6f2f6bb51da93d9eb2c3266',
  //   deviceId: '53ff6d065075535150131687'
  // })
});

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

  // var peizo = new Five.Piezo(13);
  // led2 = new Five.Led('D5');

  // led.on();

  button.on('down', function () {
    // console.log('down');
    led.on();
    led2.on();
    led3.on();
    led4.on();
    led5.on();
    led6.on();
  });

  button.on('up', function () {
    // console.log('up');
    led.off();
    led2.off();
    led3.off();
    led4.off();
    led5.off();
    led6.off();
  });

  // peizo.song("cdfda ag cdfdg gf ", "111111442111111442");

  // setTimeout(function(){
    // led.off();
  // }, 1000)
  // boardLed.blink();

});
