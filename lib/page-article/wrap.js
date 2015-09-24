var fs = require('fs');
var ejs = require('ejs');

var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var Container = require('glint-container');
var LayoutWrap = require('wrap-layout');
var Block = require('glint-block');
var Style = require('glint-plugin-block-style-editable');
var TextBlock = require('glint-block-text');
var MetaBlock = require('glint-block-meta');
var CKEditorBlock = require('glint-block-ckeditor');
var i18n = require('glint-plugin-wrap-i18n');

var Adapter = require('./adapter');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

function text() {
  return Block(TextBlock()).use(Style({hover: false}));
}

function editor() {
  return Block(CKEditorBlock()).use(Style({hover: false}));
}

exports = module.exports = function wrap(o) {
  o = o || {};

  var contentWidget = Widget(function(options) {
    return ejs.render(o.template || template, options)
  });

  var blocks = o.blocks || {
      title: text().selector('body h1'),
      short: text().selector('[data-id=short]'),
      text: editor().selector('[data-id=text]'),
      meta: Block(MetaBlock())
    };

  var adapter = o.adapter || Adapter(o);

  var container = Container(blocks, adapter);

  return Wrap()
    .use(i18n({translate: 'page'}))
    .parallel(container)
    .series('content', contentWidget.place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))

};
