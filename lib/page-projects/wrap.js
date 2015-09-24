var fs = require('fs');
var ejs = require('ejs');

var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var Container = require('glint-container');
var LayoutWrap = require('wrap-layout');
var Block = require('glint-block');
var Style = require('glint-plugin-block-style-editable');
var TextBlock = require('glint-block-text');
var MDBlock = require('glint-block-markdown');
var MetaBlock = require('glint-block-meta');
var CKEditorBlock = require('glint-block-ckeditor');
var i18n = require('glint-plugin-wrap-i18n');

var Adapter = require('./adapter');
var AdapterWidget = require('./adapter-widget');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

function text() {
  return Block(TextBlock()).use(Style());
}

function editor() {
  return Block(CKEditorBlock()).use(Style());
}

exports = module.exports = function wrap(o) {
  o = o || {};

  var wrap = Wrap(o);

  return wrap
    .use(i18n({translate: 'page'}))
    .defaults({
      'title': o.title,
      'style': '/assets/page-projects/style.css'
    })

    .series(Container({
      intro: editor().selector('[data-id=intro]'),
      outro: editor().selector('[data-id=outro]'),
      meta: Block(MetaBlock())
    }, Adapter(o)))

    .series('content', Widget()
      .data(function(fn) {
        return AdapterWidget(o.adapterWidget).all(wrap.getLocale(), fn);
      })
      .render(function(options) {
        return ejs.render(o.template || template, options);
      })
      .place('force:server'))

    .series(LayoutWrap(o.layout).place('force:server'))

};
