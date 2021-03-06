var fs = require('fs');
var ejs = require('ejs');
var defaults = require('defaults');
var Block = require('glint-block');
var Style = require('glint-plugin-block-style-editable');
var TextBlock = require('glint-block-text');
var MDBlock = require('glint-block-markdown');
var MetaBlock = require('glint-block-meta');
var CKEditorBlock = require('glint-block-ckeditor');
var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');
var Container = require('glint-container');
var Wrap = require('glint-wrap');
var i18n = require('glint-plugin-wrap-i18n');
var Widget = require('glint-widget');
var LayoutWrap = require('wrap-layout');

var Articles = require('widget-articles-featured');
var Projects = require('widget-projects-featured');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

function editor() {
  return Block(CKEditorBlock()).use(Style());
}

exports = module.exports = function wrap(o) {
  o = o || {};

  var wrap = Wrap()
    .use(i18n({translate: 'page'}));

  var articles = Articles({getLocale: wrap.getLocale});
  var projects = Projects({getLocale: wrap.getLocale});

  var contentWidget = Widget(function(options) {
    return ejs.render(o.template || template, options)
  });

  var blocks = {
    title: Block(TextBlock()).use(Style()).selector('body h1'),
    section1: editor().selector('[data-id=section1]').place('server'),
    section2: editor().selector('[data-id=section2]').place('server'),
    section3: editor().selector('[data-id=section3]').place('server'),
    footnote: editor().selector('[data-id=footnote]'),
    meta: Block(MetaBlock())
  };

  var adapter = o.adapter || PageAdapter(o);
  var db = o.db || 'glint';
  var type = o.type || 'home';
  var id = o.id || 'home';
  var templateData = o.templateData || '__template__';

  var homeAdapter = Adapter(adapter)
    .db(db)
    .type(type)

  var container = Container(blocks, homeAdapter)
    .id(id)
    .template(templateData);

  wrap
    .parallel(container)
    .parallel('articles', articles.selector('.js-articles'))
    .parallel('projects', projects.selector('.js-projects'))
    .series('content', contentWidget.place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))

  wrap.routes = adapter.routes;

  return wrap;
};



