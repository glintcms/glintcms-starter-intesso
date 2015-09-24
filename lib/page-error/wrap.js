var fs = require('fs');
var ejs = require('ejs');

var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var i18n = require('glint-plugin-wrap-i18n');
var LayoutWrap = require('wrap-layout');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

exports = module.exports = function wrap(o) {
  o = o || {};

  var contentWidget = Widget(function(options) {
      return ejs.render(o.template || template, options);
    })

  return Wrap()
    .use(i18n({translate: 'page'}))
    .defaults({
      title: 'Uups'
    })
    .series('content', contentWidget.place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))

};
