var debug = require('debug')('page-translate');
var router = require('page.js');
var defaults = require('defaults');
var key = require('keyboard-shortcut');
var keyShortcuts = require('glint-trigger-keyboard/config');
var request = require('superagent');
var Adapter = require('page-i18n/adapter');
var routeReload = require('page-i18n/config').routeReload;

var c = require('./config');
var TranslationTable = require('./translation-table');

module.exports = function translate(o) {
  o = defaults(o, c);
  o.adapter = o.adapter || Adapter(o);

  return router(o.route, function(req) {

    var translation = TranslationTable(o);

    function loadCallback(err, result) {
      debug('loaded', err, result);
    }

    function saveCallback(err, result) {
      debug('saved', err, result);
      // reload
      // TODO should use Adapter API instead of superagent directly
      request.get(location.origin + routeReload).end(function(res) {
        debug('reloaded', res);
      });
    }

    translation.load(function(err, result){
      var keys;
      keys = keyShortcuts.commands.cancel;
      keys.forEach(function(short) {
        key(short, function(e) {
          e.preventDefault();
          translation.load(loadCallback);
        });
      });

      keys = keyShortcuts.commands.save;
      keys.forEach(function(short) {
        key(short, function(e) {
          e.preventDefault();
          translation.save(saveCallback);
        });
      });
    });

    translation.addCancelHandler(loadCallback);

    translation.addSaveHandler(saveCallback);

  });

};
