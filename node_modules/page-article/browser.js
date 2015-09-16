var debug = require('debug')('page-article');
var user = require('page-auth-access');
var keyboard = require('glint-trigger-keyboard');
var sidenav = require('glint-trigger-sidenav');
var router = require('page');
var defaults = require('defaults');

var c = require('./config');
var Wrap = require('./wrap');

module.exports = function article(o) {
  o = defaults(o, c);

  return router(o.route, function(req) {

    var wrap = Wrap(o);

    debug('route', window.location.href, context.locale, req.params);
    if (user.can('edit')) {
      wrap.editable(true);
      keyboard().add(wrap.container);
      sidenav().add(wrap.container);
    }
    wrap
      .i18n(context.i18n)
      .cid(req.params.article)
      .place(o.place)
      .load(function(err, result) {
        if (err) return console.error(err);
        debug('wrap loaded', req.params.article, result);
      })
    ;
  });

};



