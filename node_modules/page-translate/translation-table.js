var debug = require('debug')('page-translate:translation-table');
var Storage = require('glint-i18n/storage');
var transform = require('glint-i18n/transform');

module.exports = function TranslationTable(o) {

  /**
   *  local variables
   */
  var adapter = o.adapter;
  var storage = Storage(adapter);
  var locales = o.locales || window.context.i18n.locales;
  var translationtable = undefined;

  /**
   * translation functions
   */
  function load(callback) {

    var el = document.querySelector(o.selector);

    if (!el) return callback('ENOEL');

    storage.loadAll(locales, function(err, result) {
      if (err) {
        console.error('error', err);
        return callback(err, result);
      }

      var data = transform.toTable(result);

      // cleanup old html
      el.innerHTML = '';
      // insert new html table
      translationtable = new Handsontable(el, {
        data: data,
        minSpareRows: 1,
        rowHeaders: false,
        colHeaders: false,
        manualColumnMove: false,
        manualRowMove: false,
        contextMenu: true
      });

      callback(err, translationtable);

    });
  }

  function save(callback) {
    if (!translationtable || !translationtable.getData)return callback('table not yet loaded');
    var data = translationtable.getData();

    var header = data[0].slice(1);
    if (!header || header.length === 0) return callback('save aborted, due to locale loss...');
    locales = header;

    console.log('header', data[0], header);

    var defs = transform.toObject(data);
    console.log('defs', defs);

    storage.saveAll(locales, defs, function(err, result) {
      if (err) {
        return callback(err, result);
      }

      callback(err, result);

    });

  }

  function addCancelHandler(callback) {
    var el = document.querySelector(o.selectorCancel);
    if (!el) return callback('ENOEL');
    el.addEventListener('click', function(e) {
      load(callback)
    });
  }

  function addSaveHandler(callback) {
    var el = document.querySelector(o.selectorSave);
    if (!el) return callback('ENOEL');
    el.addEventListener('click', function(e) {
      save(callback)
    });
  }

  return {
    load: load,
    save: save,
    addCancelHandler: addCancelHandler,
    addSaveHandler: addSaveHandler
  }

}
