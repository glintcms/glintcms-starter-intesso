var debug = require('debug')('page-i18n');
var defaults = require('defaults');
var Locale = require('glint-i18n');
var Translate = require('glint-i18n/translate');

var c = require('./config');

module.exports = function locale(o) {
  // get options right
  o = defaults(o, c);

  Locale(o);
};
