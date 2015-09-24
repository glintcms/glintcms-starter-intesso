var fs = require('fs');
var ejs = require('ejs');
var isBrowser = require('is-browser');
var Widget = require('glint-widget');

module.exports = function(o) {
  o = o || {};
  var template = o.template || fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

  return Widget(function(options) {
    return ejs.render(template, options);
  });
}

if (isBrowser) {

  //jQuery to collapse the navbar on scroll
  var scrolling = require('scrolling');
  var $navbar = $(".navbar");
  var $fixed = $(".navbar-fixed-top");

  function display() {
    var top = $navbar.offset().top;
    if (top > 50) {
      $fixed.addClass("top-nav-collapse");
    } else if (top < 40) {
      $fixed.removeClass("top-nav-collapse");
    }
  }

  display();
  scrolling(display);
  setInterval(display, 2000);

}
