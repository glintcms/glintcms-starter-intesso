var debug = require('debug')('page-home');

var user = require('page-auth-access');
var keyboard = require('glint-trigger-keyboard');
var sidenav = require('glint-trigger-sidenav');
var defaults = require('defaults');
var router = require('page');

var c = require('./config');
var Wrap = require('./wrap');

module.exports = function home(o) {
  o = defaults(o, c);

  return router(c.route, function(req) {

    var wrap = Wrap(o);

    debug('route', window.location.href, context.locale, req.params);
    if (user.can('edit')) {
      wrap.editable(true);
      wrap.containers.forEach(function(container, i) {
        keyboard().add(container);
        sidenav().add(container);
      });
    }

    wrap
      .i18n(context.i18n)
      .cid(c.id)
      .place(c.place)
      .load(function(err, result) {
        if (err) return console.error(err);
        debug('wrap loaded', c.id, result);
      })

  });

};

