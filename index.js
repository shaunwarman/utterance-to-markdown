const FS = require('fs');
const Path = require('path');
const Marker = require('json2md');

const parse = (path, callback) => {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  _read(path, (err, utterance) => {
    if (err) throw err;
    _toMarkdown(_format(utterance), callback);
  });
};

const _format = (text) => {
  const formatted = {};
  const lines = text.toString().split('\n');

  lines.forEach(line => {
    if (line) {
      const [intent, ...utterance] = line.split(' ');
      if (formatted[intent]) {
        formatted[intent].push(utterance.join(' '));
      } else {
        formatted[intent] = [].concat(utterance.join(' '));
      }
    }
  });

  let mdItems = [];
  Object.keys(formatted).forEach(intent => {
    mdItems.push({ h3: intent });
    mdItems.push({ ul: formatted[intent] });
  });

  return mdItems;
}

const _read = (path, callback) => {
  FS.readFile(path, (err, data) => {
    if (err) return callback(err);
    callback(null, data);
  });
};

const _toMarkdown = (utterances, callback) => {
  const markdown = Marker(utterances);

  FS.writeFile('UTTERANCES.md', markdown, (err) => {
    if (!err) {
      return callback(null, markdown);
    }
  });
}

module.exports = {
  parse
}
