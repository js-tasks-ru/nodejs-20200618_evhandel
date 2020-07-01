const LineSplitStream = require('./LineSplitStream');
const os = require('os');

const lines = new LineSplitStream({
    encoding: 'utf-8',
});

function onData(line) {
    console.log('-ondata-',line, line === 'ab');
}
// console.log('---start')

lines.on('data', onData);
// lines.on('end', () => {
//     expect(onData.calledThrice, 'событие data должно быть вызвано 3 раза').to.be.true;
//     expect(onData.firstCall.args[0]).to.equal('ab');
//     expect(onData.secondCall.args[0]).to.equal('cd');
//     expect(onData.thirdCall.args[0]).to.equal('ef');
//     done();
// });

lines.write('a');
lines.write(`b${os.EOL}c`);
lines.write(`d${os.EOL}e`);
lines.write('f');

lines.end();