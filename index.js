// 
// Script to connect to the Nova SDS011, read PM values from the serial port and write them to the console.
// Usage: `node index.js /dev/ttyUSB0`
//
const SerialPort = require('serialport');
const sds011 = require('./lib/sds011')
const port = process.argv[2] || '/dev/ttyUSB0';

const serial = new SerialPort(port, {
    baudrate: 9600
});

serial.on('open', function () {
    console.log('Connected');
})

serial.on('error', function (err) {
    console.error('Failed to connect:', err);
    process.exit(-1)''
})

serial.on('data', function (data) {
    const pmValues = sds011(data);

    if (!pmValues) {
        log.error('Failed to parse buffer [' + data.toString('hex') + ']');
        return;
    }

    console.info('pm2.5: ' + pmValues.pm2_5 + '\tpm10: ' + pmValues.pm10);
});
