var debug = require('debug')('page-i18n');
var defaults = require('defaults');
var express = require('express');
var router = express.Router();
var Locale = require('glint-i18n');
var Translate = require('glint-i18n/translate');
var Storage = require('glint-i18n/storage');

var c = require('./config');
var Adapter = require('./adapter');

exports = module.exports = function locale(o) {

  /**
   * get options right
   */
  o = defaults(o, c);
  var properties = o.properties;
  properties = Array.isArray(properties) ? properties : properties.split(',');
  var adapter = Adapter(o.adapter);


  /**
   * instantiate the i18n modules
   */
  var i18n = Locale(o);
  var translate = Translate(o);
  var storage = Storage(adapter);

  /**
   * reload i18n definitions from storage.
   */

  function reload(save, callback) {
    callback = callback || function noop() {
      };

    storage.loadAll(i18n.locales, function(err, definitions) {
      if (err) return debug('could not load locale definitions', err);
      i18n.defs = definitions;
      debug('locale definitions', i18n.locales, i18n.defs);
      if (!save) return callback(err, definitions);
      storage.saveAll(i18n.locales, definitions, function(err, result) {
        if (err) debug('could not save locale definitions');
        return callback(err, result);
      })
    });
  }

  reload(true);


  /**
   * i18n middleware
   */
  router.i18n = i18n;

  router.use(o.routeReload, function reloadI18n(req, res, next) {
    reload();
    next();
  });

  router.use(i18n);

  // middleware to add locale properties
  router.use(function(req, res, next) {
    var locals = res.locals;

    debug('locales', req.path, req.locales, req.locale, req.requestedLocale, req.isPreferredLocale, req.isSubLocale, req.isAcceptLocale, req.isDefaultLocale);

    // share the properties what you want, but not the translate function
    var sharedi18n = {locale: req.locale, locales: i18n.locales, defs: i18n.defs};
    req.i18n = sharedi18n;

    // add translate function for server
    req.translate = translate.bind(req.i18n, i18n.defs, i18n.locales, req.locale);
    req.__ = req.t = req.i18n.translate = req.translate;
    locals.__ = locals.t = locals.translate = req.translate;

    // add to context for the browser
    locals.context = locals.context || {};
    locals.context.i18n = sharedi18n;
    properties.forEach(function(property) {
      locals.context[property] = req[property];
    });

    next();

  });

  if (o.pathToSubdomain) {
    var localesString = i18n.locales.join(' ');
    i18n.locales.forEach(function(locale){
      router.use('/' + locale, function(req, res, next){

        debug('pathToSubdomain: locale detected', locale);

        var fragments = req.headers.host.split('.');
        if (localesString.indexOf(fragments[0]) > -1 ){
          fragments[0] = locale;
        } else {
          fragments.unshift(locale);
        }

        fragments = fragments.join('.');
        debug('pathToSubdomain: locale redirect ', fragments);
        res.redirect(req.protocol + '://' + fragments);

      });

    });
  }

  return router;
};
