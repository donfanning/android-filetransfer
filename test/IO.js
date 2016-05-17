'use strict';

const IO = require('../lib/IO');
const path = require('path');
const target = path.join(__dirname, 'src', 'data.json');

let instance = new IO.IO(target);
let initial = instance.read();
initial = JSON.parse(initial);

console.log('Initial:', initial);
initial.myValue = ['Hello', 'World', '!'];

let action = instance.write(JSON.stringify(initial));
console.log('Write succeed?:', JSON.stringify(action))
console.log('After:', JSON.parse(instance.read()));
