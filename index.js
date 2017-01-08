const FS = require('fs');
const Path = require('path');
const Marker = require('json2md');

const parse = (path, callback) => {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  _read(path, (err, utterance) => {
    if (err) throw err;
    callback(null, _format(utterance));
    // _toMarkdown(utterance, callback);
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

  return formatted;
}

const _read = (path, callback) => {
  FS.readFile(path, (err, data) => {
    if (err) return callback(err);
    callback(null, data);
  });
};

const _toMarkdown = (utterances, callback) => {

}

module.exports = {
  parse
}

// { charterBusMotto:
//  [ 'motto',
//    'charter bus motto',
//    'the charter bus motto',
//    'what is the charter bus motto',
//    'tell me the charter bus motto' ],
// numberOfChampionships:
//  [ '{name} championships',
//    '{name} number of championships',
//    'championships for {name}',
//    'number of championships for {name}',
//    'how many championships for {name}',
//    'how many championships does {name} have' ],
// getRandomFact:
//  [ 'fact',
//    'story',
//    'random fact',
//    'random story',
//    'tell me a story',
//    'tell me a random story',
//    'tell me a fact',
//    'tell me a random fact' ]
//  }

// read file to text - X
// line by line - X
// grab first key (intent function) as object key - X
// other utterance is value's array - X
// so find by object key for dupes and push to array - X

// options: `output` - `string` || `markdown file` ?
