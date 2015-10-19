var debug = require('debug')('page-projects');
var defaults = require('defaults');
var express = require('express');
var router = express.Router();

var c = require('./config');
var Wrap = require('./wrap');

function projects(o) {
  o = defaults(o, c);

  router.use(o.route, function(req, res, next) {
    debug('route', o.route, req.locale);

    Wrap(o)
      .editable(req.userCan('edit'))
      .i18n(req.i18n)
      .cid(o.id)
      .place(req.place || o.place)
      .load(res.locals, function(err, result) {
        debug('route loaded', result);
        if (err) return next(err);
        res.send(result.page);
      })
    ;
  });

  return router;
}

exports = module.exports = projects;

