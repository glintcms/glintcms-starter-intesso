var fs = require('fs');
var test = require('tape');
var ejs = require('ejs');
var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

test('render widget', function (t) {
  t.plan(2);

  var html = ejs.render(template, {
    projects: [
      {
        title: "t1",
        text1: "text1"
      },
      {
        title: "t2",
        text1: "text2"
      }
    ]}
  );
  t.true(html.indexOf('t1') > 0);
  t.true(html.indexOf('t2') > 0);
});