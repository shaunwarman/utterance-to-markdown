const Path = require('path');
const Test = require('tape');

const {parse} = require('..');

Test('utterance to markdown', t => {

  t.test('parse utterance file', t => {
    const path = Path.join(__dirname, './fixtures/utterance.txt');
    parse(path, (err, markdown) => {
      t.ok(!err, 'no error during parse');
      t.ok(markdown, 'markdown created');
      t.equals(typeof markdown, 'string');
    });
    t.end();
  });

});
