var fs = require('fs');
var ejs = require('ejs');
var Widget = require('glint-widget');
var Adapter = require('./adapter');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

module.exports = function featured (o) {
  o = o || {};
  o.getLocale = o.getLocale || function() {return ''};

  var adapter = o.adapter || Adapter(o);

  return Widget()
    .data(function(fn) {
      // projects
      return adapter.findLatest(o.getLocale(), 3, fn);
    })
    .render(function(options) {
      // projects
      return ejs.render(o.template || template, options);
    })
  ;

};

