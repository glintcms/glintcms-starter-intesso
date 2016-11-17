var Query = require('mingo');
var Adapter = require('page-article/adapter');

var mixins = {
  fs: {
    all: function (locale, fn) {
      var query = 'this.id.indexOf("__template__") === -1 && this.locale === "' + locale + '"';
      this.find({ $where: query }, function (err, result) {
        result = result || [];
        var filtered = Query.find(result, {}).sort({ 'updatedAt': -1 }).all();
        return fn(err, { articlesAll: filtered });
      });
    }
  }

};

module.exports = function articles(o) {
  return Adapter(o).mixin(mixins);
};
