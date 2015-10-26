var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');
var Dates = require('glint-plugin-adapter-dates');
var Id = require('glint-plugin-adapter-id');

exports = module.exports = function article(o) {
  o = o || {};

  var adapter = o.adapter || PageAdapter(o);
  var db = o.db || 'glint';
  var type = o.type || 'article';

  return Adapter(adapter)
    .db(db)
    .type(type)
    .use(Dates())
    .use(Id())

};
