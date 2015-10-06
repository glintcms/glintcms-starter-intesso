var debug = require('debug')('page-home');
var defaults = require('defaults');
var express = require('express');
var router = express.Router();

var c = require('./config');
var Wrap = require('./wrap');

exports = module.exports = function home(o) {
  o = defaults(o, c);

  router.use(o.route, function(req, res, next) {
    debug('route', o.route, req.locale, req.user, res.locals);

    Wrap(o)
      .editable(req.userCan('edit'))
      .i18n(req.i18n)
      .cid(o.id)
      .place(o.place)
      .load(res.locals, function(err, result) {
        debug('route loaded', o.route, err, result);
        if (err) return next(err);
        res.send(result.page);
      })

  });

  return router;

};
