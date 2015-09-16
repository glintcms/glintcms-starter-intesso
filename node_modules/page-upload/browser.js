var router = require('page');
var defaults = require('defaults');

var c = require('./config');

module.exports = function upload(o) {
  o = defaults(o, c);

  return router(o.get, function(req) {
    var el = document.querySelector(o.selector);
    if (el) el.setAttribute('action', location.pathname);
  });
};



