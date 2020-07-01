const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  #buffer = '';
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let str = chunk.toString('utf-8');
    if (str.indexOf(os.EOL) === -1) {
      this.#buffer += str;
      return callback(null);
    } else {
      str = this.#buffer + str;
      this.#buffer = '';
    }
    const arr = str.split(os.EOL)

    arr.forEach((item, index) => {
      if (index === arr.length - 1 && item.length) {
        this.#buffer = item;
      } else {
        this.push(item);
        this.#buffer = '';
      }
    })
    callback(null);
  }

  _flush(callback) {
    if (this.#buffer) {
      this.push(this.#buffer);
      this.#buffer = '';
    }
    callback();
  }
}

module.exports = LineSplitStream;
