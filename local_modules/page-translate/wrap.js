var fs = require('fs');
var dot = require('dot');

var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var defaults = require('defaults');
var LayoutWrap = require('wrap-layout');
var i18n = require('glint-plugin-wrap-i18n');

var template = fs.readFileSync(__dirname + '/index.dot', 'utf-8');
var compiled = dot.template(template);

module.exports = function wrap(o) {
  o = o || {};

  var contentWidget = Widget(function(options) {
    return compiled(options);
  });

  return Wrap()
    .use(i18n({translate: 'page'}))
    .defaults({
      title: 'i18n-Translation',
      meta: {title: 'i18n-Translation'},
      style: '/assets/page-translate/handsontable.full.min.css',
      script: '/assets/page-translate/handsontable.full.min.js'
    })
    .series('content', contentWidget.place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))
    ;

};
