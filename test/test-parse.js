const Path = require('path');
const Test = require('tape');

const {parse} = require('..');

Test('utterance to markdown', t => {

  t.test('parse utterance file', t => {
    const path = Path.join(__dirname, './fixtures/utterance.txt');
    parse(path, (err, markdown) => {
      console.log(markdown);
    });
    t.end();
  });

});
