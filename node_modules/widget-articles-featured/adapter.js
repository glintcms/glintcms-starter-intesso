var Query = require('mingo');
var Adapter = require('page-article/adapter');

var mixins = {
  fs: {
    findWithTitle: function(title, fn) {
      var query = 'this.title.indexOf("' + title + '") !== -1';
      this.find({$where: query}, function(err, result) {
        result = result || [];
        var filtered = Query.find(result, {}).limit(3).all();
        return fn(err, {articles: filtered});
      });
    },
    findLatest: function(locale, number, fn) {
      var query = 'this.id.indexOf("__template__") === -1 && this.locale === "' + locale + '"';
      this.find({$where: query}, function(err, result) {
        result = result || [];
        var filtered = Query.find(result, {}).sort({'updatedAt': 1}).limit(number).all();
        return fn(err, {articles: filtered});
      });
    }
  }
};

module.exports = function articles(o) {
  return Adapter(o).mixin(mixins);
};
