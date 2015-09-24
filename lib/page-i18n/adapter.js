var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');

module.exports = function(o) {
  o = o || {};
  var adapter = o.adapter || PageAdapter(o);
  var db = o.db || 'glint';
  var type = o.type || 'i18n';

  return Adapter(adapter)
    .db(db)
    .type(type)

};
