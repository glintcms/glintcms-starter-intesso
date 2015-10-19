var debug = require('debug')('page-article');
var defaults = require('defaults');
var express = require('express');
var router = express.Router();

var c = require('./config');
var Wrap = require('./wrap');

function article(o) {
  o = defaults(o, c);

  router.use(o.route, function(req, res, next) {
    debug('route', o.route, req.locale, req.params.article);

    Wrap(o)
      .editable(req.userCan('edit'))
      .i18n(req.i18n)
      .cid(req.params.article)
      .place(req.place || o.place)
      .load(res.locals, function(err, result) {
        debug('route loaded', err, req.params.article, result);
        if (err) return next(err);
        res.send(result.page);
      })
    ;
  });

  return router;
}

exports = module.exports = article;
