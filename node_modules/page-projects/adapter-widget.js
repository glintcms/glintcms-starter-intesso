var Query = require('mingo');
var Adapter = require('page-project/adapter');

var mixins = {
  fs: {
    all: function(locale, fn) {
      var query = 'this.id.indexOf("__template__") === -1 && this.locale === "' + locale + '"';
      this.find({$where: query}, function(err, result) {
        result = result || [];
        var filtered = Query.find(result, {}).all();
        return fn(err, {projectsAll: filtered});
      });
    }
  }
};

module.exports = function projects(o) {
  return Adapter(o).mixin(mixins);
};
