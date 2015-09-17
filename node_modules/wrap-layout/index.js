var fs = require('fs');
var ejs = require('ejs');
var isBrowser = require('is-browser');
var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var Adapter = require('glint-adapter');
var Style = require('glint-plugin-block-style-editable');
var i18n = require('glint-plugin-wrap-i18n');
var Block = require('glint-block');
var TextBlock = require('glint-block-text');
var CKEditorBlock = require('glint-block-ckeditor');
var Container = require('glint-container');
var PageAdapter = require('page-adapter');
var MenuWidget = require('widget-menu');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

// `title` and `content` must be provided
module.exports = function layout(o) {
  o = o || {};

  var pageWidget = Widget(function(options) {
    return ejs.render(o.template || template, options)
  });

  function text() {
    return Block(TextBlock()).use(Style());
  }

  function editor() {
    return Block(CKEditorBlock()).use(Style({hover: false}));
  }

  var blocks = {
    footer: editor().selector('[data-id=footer]')
  };

  var adapter = o.adapter || PageAdapter(o);
  var db = o.db || 'glint';
  var type = o.type || 'layout';
  var id = o.id || 'layout';
  var templateData = o.templateData || '__template__';

  var layoutAdapter = Adapter(adapter).db(db).type(type);

  var container = Container(blocks, layoutAdapter).id(id).template(templateData);

  return Wrap()
    .use(i18n({translate: 'page'}))
    .series(container)
    .series('menu', MenuWidget().selector('body').prepend(true).place('force:server'))
    .series('page', pageWidget.place('force:server'))

};

if (isBrowser) {

  //jQuery to collapse the navbar on scroll
  var scrolling = require('scrolling');
  var $div = $("div");
  var $footer = $("footer");
  var $body = $('body');
  var $window = $(window);

  function display() {
    var windowWidth = $window.width();
    var windowHeight = $window.height();
    var space = $window.height() - $footer.height();
    var top = $div.offset().top;

    if (top > 50 || space < 260) {
      $footer.addClass("footer-hidden");
    } else if (top < 40) {
      $footer.removeClass("footer-hidden");
    }
  }

  display();
  scrolling(display);
  setInterval(display, 2000);

}
