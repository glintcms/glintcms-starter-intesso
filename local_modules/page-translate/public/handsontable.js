/*!
 * Handsontable 0.16.1
 * Handsontable is a JavaScript library for editable tables with basic copy-paste compatibility with Excel and Google Docs
 *
 * Copyright (c) 2012-2014 Marcin Warpechowski
 * Copyright 2015 Handsoncode sp. z o.o. <hello@handsontable.com>
 * Licensed under the MIT license.
 * http://handsontable.com/
 *
 * Date: Fri Jul 24 2015 09:09:44 GMT+0200 (CEST)
 */
/*jslint white: true, browser: true, plusplus: true, indent: 4, maxerr: 50 */

window.Handsontable = {
  version: '0.16.1',
  buildDate: 'Fri Jul 24 2015 09:09:44 GMT+0200 (CEST)'
};
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Handsontable = f()}})(function(){var define,module,exports;return (function init(modules, cache, entry) {
  (function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;
    var globalNS = JSON.parse('{"zeroclipboard":"ZeroClipboard","moment":"moment","pikaday":"Pikaday"}') || {};

    function newRequire(name, jumped){
      if(!cache[name]) {

        if(!modules[name]) {
          // if we cannot find the the module within our internal map or
          // cache jump to the current global require ie. the last bundle
          // that was added to the page.
          var currentRequire = typeof require == "function" && require;
          if (!jumped && currentRequire) return currentRequire(name, true);

          // If there are other bundles on this page the require from the
          // previous one is saved to 'previousRequire'. Repeat this as
          // many times as there are bundles until the module is found or
          // we exhaust the require chain.
          if (previousRequire) return previousRequire(name, true);

          // Try find module from global scope
          if (globalNS[name] && typeof window[globalNS[name]] !== 'undefined') {
            return window[globalNS[name]];
          }

          var err = new Error('Cannot find module \'' + name + '\'');
          err.code = 'MODULE_NOT_FOUND';
          throw err;
        }
        var m = cache[name] = {exports:{}};
        modules[name][0].call(m.exports, function(x){
          var id = modules[name][1][x];
          return newRequire(id ? id : x);
        },m,m.exports,outer,modules,cache,entry);
      }

      return cache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
  })(modules, cache, entry);

  return function() {
    return Handsontable;
  };
})
({1:[function(require,module,exports){
  "use strict";
  if (window.jQuery) {
    (function(window, $, Handsontable) {
      $.fn.handsontable = function(action) {
        var i,
          ilen,
          args,
          output,
          userSettings,
          $this = this.first(),
          instance = $this.data('handsontable');
        if (typeof action !== 'string') {
          userSettings = action || {};
          if (instance) {
            instance.updateSettings(userSettings);
          } else {
            instance = new Handsontable.Core($this[0], userSettings);
            $this.data('handsontable', instance);
            instance.init();
          }
          return $this;
        } else {
          args = [];
          if (arguments.length > 1) {
            for (i = 1, ilen = arguments.length; i < ilen; i++) {
              args.push(arguments[i]);
            }
          }
          if (instance) {
            if (typeof instance[action] !== 'undefined') {
              output = instance[action].apply(instance, args);
              if (action === 'destroy') {
                $this.removeData();
              }
            } else {
              throw new Error('Handsontable do not provide action: ' + action);
            }
          }
          return output;
        }
      };
    })(window, jQuery, Handsontable);
  }

//# 
},{}],2:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableBorder: {get: function() {
      return WalkontableBorder;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___46__46__47__46__46__47__46__46__47_eventManager_46_js__,
    $__cell_47_coords_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../dom.js"), $___46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_dom_46_js__});
  var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager_46_js__ = require("./../../../eventManager.js"), $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager_46_js__}).EventManager;
  var WalkontableCellCoords = ($__cell_47_coords_46_js__ = require("./cell/coords.js"), $__cell_47_coords_46_js__ && $__cell_47_coords_46_js__.__esModule && $__cell_47_coords_46_js__ || {default: $__cell_47_coords_46_js__}).WalkontableCellCoords;
  var WalkontableBorder = function WalkontableBorder(wotInstance, settings) {
    if (!settings) {
      return;
    }
    this.eventManager = new EventManager(wotInstance);
    this.instance = wotInstance;
    this.wot = wotInstance;
    this.settings = settings;
    this.mouseDown = false;
    this.main = null;
    this.top = null;
    this.left = null;
    this.bottom = null;
    this.right = null;
    this.topStyle = null;
    this.leftStyle = null;
    this.bottomStyle = null;
    this.rightStyle = null;
    this.cornerDefaultStyle = {
      width: '5px',
      height: '5px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#FFF'
    };
    this.corner = null;
    this.cornerStyle = null;
    this.createBorders(settings);
    this.registerListeners();
  };
  ($traceurRuntime.createClass)(WalkontableBorder, {
    registerListeners: function() {
      var $__2 = this;
      this.eventManager.addEventListener(document.body, 'mousedown', (function() {
        return $__2.onMouseDown();
      }));
      this.eventManager.addEventListener(document.body, 'mouseup', (function() {
        return $__2.onMouseUp();
      }));
      for (var c = 0,
             len = this.main.childNodes.length; c < len; c++) {
        this.eventManager.addEventListener(this.main.childNodes[c], 'mouseenter', (function(event) {
          return $__2.onMouseEnter(event);
        }));
      }
    },
    onMouseDown: function() {
      this.mouseDown = true;
    },
    onMouseUp: function() {
      this.mouseDown = false;
    },
    onMouseEnter: function(event) {
      if (!this.mouseDown || !this.wot.getSetting('hideBorderOnMouseDownOver')) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      var _this = this;
      var bounds = this.getBoundingClientRect();
      this.style.display = 'none';
      function isOutside(event) {
        if (event.clientY < Math.floor(bounds.top)) {
          return true;
        }
        if (event.clientY > Math.ceil(bounds.top + bounds.height)) {
          return true;
        }
        if (event.clientX < Math.floor(bounds.left)) {
          return true;
        }
        if (event.clientX > Math.ceil(bounds.left + bounds.width)) {
          return true;
        }
      }
      function handler(event) {
        if (isOutside(event)) {
          _this.eventManager.removeEventListener(document.body, 'mousemove', handler);
          _this.style.display = 'block';
        }
      }
      this.eventManager.addEventListener(document.body, 'mousemove', handler);
    },
    createBorders: function(settings) {
      this.main = document.createElement('div');
      var borderDivs = ['top', 'left', 'bottom', 'right', 'corner'];
      var style = this.main.style;
      style.position = 'absolute';
      style.top = 0;
      style.left = 0;
      for (var i = 0; i < 5; i++) {
        var position = borderDivs[i];
        var div = document.createElement('div');
        div.className = 'wtBorder ' + (this.settings.className || '');
        if (this.settings[position] && this.settings[position].hide) {
          div.className += ' hidden';
        }
        style = div.style;
        style.backgroundColor = (this.settings[position] && this.settings[position].color) ? this.settings[position].color : settings.border.color;
        style.height = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
        style.width = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
        this.main.appendChild(div);
      }
      this.top = this.main.childNodes[0];
      this.left = this.main.childNodes[1];
      this.bottom = this.main.childNodes[2];
      this.right = this.main.childNodes[3];
      this.topStyle = this.top.style;
      this.leftStyle = this.left.style;
      this.bottomStyle = this.bottom.style;
      this.rightStyle = this.right.style;
      this.corner = this.main.childNodes[4];
      this.corner.className += ' corner';
      this.cornerStyle = this.corner.style;
      this.cornerStyle.width = this.cornerDefaultStyle.width;
      this.cornerStyle.height = this.cornerDefaultStyle.height;
      this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(' ');
      if (Handsontable.mobileBrowser) {
        this.createMultipleSelectorHandles();
      }
      this.disappear();
      if (!this.wot.wtTable.bordersHolder) {
        this.wot.wtTable.bordersHolder = document.createElement('div');
        this.wot.wtTable.bordersHolder.className = 'htBorders';
        this.wot.wtTable.spreader.appendChild(this.wot.wtTable.bordersHolder);
      }
      this.wot.wtTable.bordersHolder.insertBefore(this.main, this.wot.wtTable.bordersHolder.firstChild);
    },
    createMultipleSelectorHandles: function() {
      this.selectionHandles = {
        topLeft: document.createElement('DIV'),
        topLeftHitArea: document.createElement('DIV'),
        bottomRight: document.createElement('DIV'),
        bottomRightHitArea: document.createElement('DIV')
      };
      var width = 10;
      var hitAreaWidth = 40;
      this.selectionHandles.topLeft.className = 'topLeftSelectionHandle';
      this.selectionHandles.topLeftHitArea.className = 'topLeftSelectionHandle-HitArea';
      this.selectionHandles.bottomRight.className = 'bottomRightSelectionHandle';
      this.selectionHandles.bottomRightHitArea.className = 'bottomRightSelectionHandle-HitArea';
      this.selectionHandles.styles = {
        topLeft: this.selectionHandles.topLeft.style,
        topLeftHitArea: this.selectionHandles.topLeftHitArea.style,
        bottomRight: this.selectionHandles.bottomRight.style,
        bottomRightHitArea: this.selectionHandles.bottomRightHitArea.style
      };
      var hitAreaStyle = {
        'position': 'absolute',
        'height': hitAreaWidth + 'px',
        'width': hitAreaWidth + 'px',
        'border-radius': parseInt(hitAreaWidth / 1.5, 10) + 'px'
      };
      for (var prop in hitAreaStyle) {
        if (hitAreaStyle.hasOwnProperty(prop)) {
          this.selectionHandles.styles.bottomRightHitArea[prop] = hitAreaStyle[prop];
          this.selectionHandles.styles.topLeftHitArea[prop] = hitAreaStyle[prop];
        }
      }
      var handleStyle = {
        'position': 'absolute',
        'height': width + 'px',
        'width': width + 'px',
        'border-radius': parseInt(width / 1.5, 10) + 'px',
        'background': '#F5F5FF',
        'border': '1px solid #4285c8'
      };
      for (var prop$__4 in handleStyle) {
        if (handleStyle.hasOwnProperty(prop$__4)) {
          this.selectionHandles.styles.bottomRight[prop$__4] = handleStyle[prop$__4];
          this.selectionHandles.styles.topLeft[prop$__4] = handleStyle[prop$__4];
        }
      }
      this.main.appendChild(this.selectionHandles.topLeft);
      this.main.appendChild(this.selectionHandles.bottomRight);
      this.main.appendChild(this.selectionHandles.topLeftHitArea);
      this.main.appendChild(this.selectionHandles.bottomRightHitArea);
    },
    isPartRange: function(row, col) {
      if (this.wot.selections.area.cellRange) {
        if (row != this.wot.selections.area.cellRange.to.row || col != this.wot.selections.area.cellRange.to.col) {
          return true;
        }
      }
      return false;
    },
    updateMultipleSelectionHandlesPosition: function(row, col, top, left, width, height) {
      var handleWidth = parseInt(this.selectionHandles.styles.topLeft.width, 10);
      var hitAreaWidth = parseInt(this.selectionHandles.styles.topLeftHitArea.width, 10);
      this.selectionHandles.styles.topLeft.top = parseInt(top - handleWidth, 10) + "px";
      this.selectionHandles.styles.topLeft.left = parseInt(left - handleWidth, 10) + "px";
      this.selectionHandles.styles.topLeftHitArea.top = parseInt(top - (hitAreaWidth / 4) * 3, 10) + "px";
      this.selectionHandles.styles.topLeftHitArea.left = parseInt(left - (hitAreaWidth / 4) * 3, 10) + "px";
      this.selectionHandles.styles.bottomRight.top = parseInt(top + height, 10) + "px";
      this.selectionHandles.styles.bottomRight.left = parseInt(left + width, 10) + "px";
      this.selectionHandles.styles.bottomRightHitArea.top = parseInt(top + height - hitAreaWidth / 4, 10) + "px";
      this.selectionHandles.styles.bottomRightHitArea.left = parseInt(left + width - hitAreaWidth / 4, 10) + "px";
      if (this.settings.border.multipleSelectionHandlesVisible && this.settings.border.multipleSelectionHandlesVisible()) {
        this.selectionHandles.styles.topLeft.display = "block";
        this.selectionHandles.styles.topLeftHitArea.display = "block";
        if (!this.isPartRange(row, col)) {
          this.selectionHandles.styles.bottomRight.display = "block";
          this.selectionHandles.styles.bottomRightHitArea.display = "block";
        } else {
          this.selectionHandles.styles.bottomRight.display = "none";
          this.selectionHandles.styles.bottomRightHitArea.display = "none";
        }
      } else {
        this.selectionHandles.styles.topLeft.display = "none";
        this.selectionHandles.styles.bottomRight.display = "none";
        this.selectionHandles.styles.topLeftHitArea.display = "none";
        this.selectionHandles.styles.bottomRightHitArea.display = "none";
      }
      if (row == this.wot.wtSettings.getSetting('fixedRowsTop') || col == this.wot.wtSettings.getSetting('fixedColumnsLeft')) {
        this.selectionHandles.styles.topLeft.zIndex = "9999";
        this.selectionHandles.styles.topLeftHitArea.zIndex = "9999";
      } else {
        this.selectionHandles.styles.topLeft.zIndex = "";
        this.selectionHandles.styles.topLeftHitArea.zIndex = "";
      }
    },
    appear: function(corners) {
      if (this.disabled) {
        return;
      }
      var isMultiple,
        fromTD,
        toTD,
        fromOffset,
        toOffset,
        containerOffset,
        top,
        minTop,
        left,
        minLeft,
        height,
        width,
        fromRow,
        fromColumn,
        toRow,
        toColumn,
        ilen;
      if (this.wot.cloneOverlay instanceof WalkontableTopOverlay || this.wot.cloneOverlay instanceof WalkontableCornerOverlay) {
        ilen = this.wot.getSetting('fixedRowsTop');
      } else {
        ilen = this.wot.wtTable.getRenderedRowsCount();
      }
      for (var i = 0; i < ilen; i++) {
        var s = this.wot.wtTable.rowFilter.renderedToSource(i);
        if (s >= corners[0] && s <= corners[2]) {
          fromRow = s;
          break;
        }
      }
      for (var i$__5 = ilen - 1; i$__5 >= 0; i$__5--) {
        var s$__6 = this.wot.wtTable.rowFilter.renderedToSource(i$__5);
        if (s$__6 >= corners[0] && s$__6 <= corners[2]) {
          toRow = s$__6;
          break;
        }
      }
      ilen = this.wot.wtTable.getRenderedColumnsCount();
      for (var i$__7 = 0; i$__7 < ilen; i$__7++) {
        var s$__8 = this.wot.wtTable.columnFilter.renderedToSource(i$__7);
        if (s$__8 >= corners[1] && s$__8 <= corners[3]) {
          fromColumn = s$__8;
          break;
        }
      }
      for (var i$__9 = ilen - 1; i$__9 >= 0; i$__9--) {
        var s$__10 = this.wot.wtTable.columnFilter.renderedToSource(i$__9);
        if (s$__10 >= corners[1] && s$__10 <= corners[3]) {
          toColumn = s$__10;
          break;
        }
      }
      if (fromRow === void 0 || fromColumn === void 0) {
        this.disappear();
        return;
      }
      isMultiple = (fromRow !== toRow || fromColumn !== toColumn);
      fromTD = this.wot.wtTable.getCell(new WalkontableCellCoords(fromRow, fromColumn));
      toTD = isMultiple ? this.wot.wtTable.getCell(new WalkontableCellCoords(toRow, toColumn)) : fromTD;
      fromOffset = dom.offset(fromTD);
      toOffset = isMultiple ? dom.offset(toTD) : fromOffset;
      containerOffset = dom.offset(this.wot.wtTable.TABLE);
      minTop = fromOffset.top;
      height = toOffset.top + dom.outerHeight(toTD) - minTop;
      minLeft = fromOffset.left;
      width = toOffset.left + dom.outerWidth(toTD) - minLeft;
      top = minTop - containerOffset.top - 1;
      left = minLeft - containerOffset.left - 1;
      var style = dom.getComputedStyle(fromTD);
      if (parseInt(style.borderTopWidth, 10) > 0) {
        top += 1;
        height = height > 0 ? height - 1 : 0;
      }
      if (parseInt(style.borderLeftWidth, 10) > 0) {
        left += 1;
        width = width > 0 ? width - 1 : 0;
      }
      this.topStyle.top = top + 'px';
      this.topStyle.left = left + 'px';
      this.topStyle.width = width + 'px';
      this.topStyle.display = 'block';
      this.leftStyle.top = top + 'px';
      this.leftStyle.left = left + 'px';
      this.leftStyle.height = height + 'px';
      this.leftStyle.display = 'block';
      var delta = Math.floor(this.settings.border.width / 2);
      this.bottomStyle.top = top + height - delta + 'px';
      this.bottomStyle.left = left + 'px';
      this.bottomStyle.width = width + 'px';
      this.bottomStyle.display = 'block';
      this.rightStyle.top = top + 'px';
      this.rightStyle.left = left + width - delta + 'px';
      this.rightStyle.height = height + 1 + 'px';
      this.rightStyle.display = 'block';
      if (Handsontable.mobileBrowser || (!this.hasSetting(this.settings.border.cornerVisible) || this.isPartRange(toRow, toColumn))) {
        this.cornerStyle.display = 'none';
      } else {
        this.cornerStyle.top = top + height - 4 + 'px';
        this.cornerStyle.left = left + width - 4 + 'px';
        this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth;
        this.cornerStyle.width = this.cornerDefaultStyle.width;
        this.cornerStyle.display = 'block';
        if (toColumn === this.wot.getSetting('totalColumns') - 1) {
          var trimmingContainer = dom.getTrimmingContainer(this.wot.wtTable.TABLE);
          var cornerOverlappingContainer = toTD.offsetLeft + dom.outerWidth(toTD) >= dom.innerWidth(trimmingContainer);
          if (cornerOverlappingContainer) {
            this.cornerStyle.left = Math.floor(left + width - 3 - parseInt(this.cornerDefaultStyle.width) / 2) + "px";
            this.cornerStyle.borderRightWidth = 0;
          }
        }
      }
      if (Handsontable.mobileBrowser) {
        this.updateMultipleSelectionHandlesPosition(fromRow, fromColumn, top, left, width, height);
      }
    },
    disappear: function() {
      this.topStyle.display = 'none';
      this.leftStyle.display = 'none';
      this.bottomStyle.display = 'none';
      this.rightStyle.display = 'none';
      this.cornerStyle.display = 'none';
      if (Handsontable.mobileBrowser) {
        this.selectionHandles.styles.topLeft.display = 'none';
        this.selectionHandles.styles.bottomRight.display = 'none';
      }
    },
    hasSetting: function(setting) {
      if (typeof setting === 'function') {
        return setting();
      }
      return !!setting;
    }
  }, {});
  ;
  window.WalkontableBorder = WalkontableBorder;

//# 
},{"./../../../dom.js":27,"./../../../eventManager.js":41,"./cell/coords.js":5}],3:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableViewportColumnsCalculator: {get: function() {
      return WalkontableViewportColumnsCalculator;
    }},
    __esModule: {value: true}
  });
  var privatePool = new WeakMap();
  var WalkontableViewportColumnsCalculator = function WalkontableViewportColumnsCalculator(viewportWidth, scrollOffset, totalColumns, columnWidthFn, overrideFn, onlyFullyVisible, stretchH) {
    privatePool.set(this, {
      viewportWidth: viewportWidth,
      scrollOffset: scrollOffset,
      totalColumns: totalColumns,
      columnWidthFn: columnWidthFn,
      overrideFn: overrideFn,
      onlyFullyVisible: onlyFullyVisible
    });
    this.count = 0;
    this.startColumn = null;
    this.endColumn = null;
    this.startPosition = null;
    this.stretchAllRatio = 0;
    this.stretchLastWidth = 0;
    this.stretch = stretchH;
    this.totalTargetWidth = 0;
    this.needVerifyLastColumnWidth = true;
    this.stretchAllColumnsWidth = [];
    this.calculate();
  };
  var $WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;
  ($traceurRuntime.createClass)(WalkontableViewportColumnsCalculator, {
    calculate: function() {
      var sum = 0;
      var needReverse = true;
      var startPositions = [];
      var columnWidth;
      var priv = privatePool.get(this);
      var onlyFullyVisible = priv.onlyFullyVisible;
      var overrideFn = priv.overrideFn;
      var scrollOffset = priv.scrollOffset;
      var totalColumns = priv.totalColumns;
      var viewportWidth = priv.viewportWidth;
      for (var i = 0; i < totalColumns; i++) {
        columnWidth = this._getColumnWidth(i);
        if (sum <= scrollOffset && !onlyFullyVisible) {
          this.startColumn = i;
        }
        if (sum >= scrollOffset && sum + columnWidth <= scrollOffset + viewportWidth) {
          if (this.startColumn == null) {
            this.startColumn = i;
          }
          this.endColumn = i;
        }
        startPositions.push(sum);
        sum += columnWidth;
        if (!onlyFullyVisible) {
          this.endColumn = i;
        }
        if (sum >= scrollOffset + viewportWidth) {
          needReverse = false;
          break;
        }
      }
      if (this.endColumn === totalColumns - 1 && needReverse) {
        this.startColumn = this.endColumn;
        while (this.startColumn > 0) {
          var viewportSum = startPositions[this.endColumn] + columnWidth - startPositions[this.startColumn - 1];
          if (viewportSum <= viewportWidth || !onlyFullyVisible) {
            this.startColumn--;
          }
          if (viewportSum > viewportWidth) {
            break;
          }
        }
      }
      if (this.startColumn !== null && overrideFn) {
        overrideFn(this);
      }
      this.startPosition = startPositions[this.startColumn];
      if (this.startPosition == void 0) {
        this.startPosition = null;
      }
      if (this.startColumn !== null) {
        this.count = this.endColumn - this.startColumn + 1;
      }
    },
    refreshStretching: function(totalWidth) {
      if (this.stretch === 'none') {
        return;
      }
      var sumAll = 0;
      var columnWidth;
      var remainingSize;
      var priv = privatePool.get(this);
      var totalColumns = priv.totalColumns;
      for (var i = 0; i < totalColumns; i++) {
        columnWidth = this._getColumnWidth(i);
        sumAll += columnWidth;
      }
      this.totalTargetWidth = totalWidth;
      remainingSize = sumAll - totalWidth;
      if (this.stretch === 'all' && remainingSize < 0) {
        this.stretchAllRatio = totalWidth / sumAll;
        this.stretchAllColumnsWidth = [];
        this.needVerifyLastColumnWidth = true;
      } else if (this.stretch === 'last' && totalWidth !== Infinity) {
        this.stretchLastWidth = -remainingSize + this._getColumnWidth(totalColumns - 1);
      }
    },
    getStretchedColumnWidth: function(column, baseWidth) {
      var result = null;
      if (this.stretch === 'all' && this.stretchAllRatio !== 0) {
        result = this._getStretchedAllColumnWidth(column, baseWidth);
      } else if (this.stretch === 'last' && this.stretchLastWidth !== 0) {
        result = this._getStretchedLastColumnWidth(column);
      }
      return result;
    },
    _getStretchedAllColumnWidth: function(column, baseWidth) {
      var sumRatioWidth = 0;
      var priv = privatePool.get(this);
      var totalColumns = priv.totalColumns;
      if (!this.stretchAllColumnsWidth[column]) {
        this.stretchAllColumnsWidth[column] = Math.round(baseWidth * this.stretchAllRatio);
      }
      if (this.stretchAllColumnsWidth.length === totalColumns && this.needVerifyLastColumnWidth) {
        this.needVerifyLastColumnWidth = false;
        for (var i = 0; i < this.stretchAllColumnsWidth.length; i++) {
          sumRatioWidth += this.stretchAllColumnsWidth[i];
        }
        if (sumRatioWidth !== this.totalTargetWidth) {
          this.stretchAllColumnsWidth[this.stretchAllColumnsWidth.length - 1] += this.totalTargetWidth - sumRatioWidth;
        }
      }
      return this.stretchAllColumnsWidth[column];
    },
    _getStretchedLastColumnWidth: function(column) {
      var priv = privatePool.get(this);
      var totalColumns = priv.totalColumns;
      if (column === totalColumns - 1) {
        return this.stretchLastWidth;
      }
      return null;
    },
    _getColumnWidth: function(column) {
      var width = privatePool.get(this).columnWidthFn(column);
      if (width === undefined) {
        width = $WalkontableViewportColumnsCalculator.DEFAULT_WIDTH;
      }
      return width;
    }
  }, {get DEFAULT_WIDTH() {
    return 50;
  }});
  ;
  window.WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;

//# 
},{}],4:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableViewportRowsCalculator: {get: function() {
      return WalkontableViewportRowsCalculator;
    }},
    __esModule: {value: true}
  });
  var privatePool = new WeakMap();
  var WalkontableViewportRowsCalculator = function WalkontableViewportRowsCalculator(viewportHeight, scrollOffset, totalRows, rowHeightFn, overrideFn, onlyFullyVisible) {
    privatePool.set(this, {
      viewportHeight: viewportHeight,
      scrollOffset: scrollOffset,
      totalRows: totalRows,
      rowHeightFn: rowHeightFn,
      overrideFn: overrideFn,
      onlyFullyVisible: onlyFullyVisible
    });
    this.count = 0;
    this.startRow = null;
    this.endRow = null;
    this.startPosition = null;
    this.calculate();
  };
  var $WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;
  ($traceurRuntime.createClass)(WalkontableViewportRowsCalculator, {calculate: function() {
    var sum = 0;
    var needReverse = true;
    var startPositions = [];
    var priv = privatePool.get(this);
    var onlyFullyVisible = priv.onlyFullyVisible;
    var overrideFn = priv.overrideFn;
    var rowHeightFn = priv.rowHeightFn;
    var scrollOffset = priv.scrollOffset;
    var totalRows = priv.totalRows;
    var viewportHeight = priv.viewportHeight;
    for (var i = 0; i < totalRows; i++) {
      var rowHeight = rowHeightFn(i);
      if (rowHeight === undefined) {
        rowHeight = $WalkontableViewportRowsCalculator.DEFAULT_HEIGHT;
      }
      if (sum <= scrollOffset && !onlyFullyVisible) {
        this.startRow = i;
      }
      if (sum >= scrollOffset && sum + rowHeight <= scrollOffset + viewportHeight) {
        if (this.startRow === null) {
          this.startRow = i;
        }
        this.endRow = i;
      }
      startPositions.push(sum);
      sum += rowHeight;
      if (!onlyFullyVisible) {
        this.endRow = i;
      }
      if (sum >= scrollOffset + viewportHeight) {
        needReverse = false;
        break;
      }
    }
    if (this.endRow === totalRows - 1 && needReverse) {
      this.startRow = this.endRow;
      while (this.startRow > 0) {
        var viewportSum = startPositions[this.endRow] + rowHeight - startPositions[this.startRow - 1];
        if (viewportSum <= viewportHeight || !onlyFullyVisible) {
          this.startRow--;
        }
        if (viewportSum >= viewportHeight) {
          break;
        }
      }
    }
    if (this.startRow !== null && overrideFn) {
      overrideFn(this);
    }
    this.startPosition = startPositions[this.startRow];
    if (this.startPosition == void 0) {
      this.startPosition = null;
    }
    if (this.startRow !== null) {
      this.count = this.endRow - this.startRow + 1;
    }
  }}, {get DEFAULT_HEIGHT() {
    return 23;
  }});
  ;
  window.WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;

//# 
},{}],5:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableCellCoords: {get: function() {
      return WalkontableCellCoords;
    }},
    __esModule: {value: true}
  });
  var WalkontableCellCoords = function WalkontableCellCoords(row, col) {
    if (typeof row !== 'undefined' && typeof col !== 'undefined') {
      this.row = row;
      this.col = col;
    } else {
      this.row = null;
      this.col = null;
    }
  };
  ($traceurRuntime.createClass)(WalkontableCellCoords, {
    isValid: function(wotInstance) {
      if (this.row < 0 || this.col < 0) {
        return false;
      }
      if (this.row >= wotInstance.getSetting('totalRows') || this.col >= wotInstance.getSetting('totalColumns')) {
        return false;
      }
      return true;
    },
    isEqual: function(cellCoords) {
      if (cellCoords === this) {
        return true;
      }
      return this.row === cellCoords.row && this.col === cellCoords.col;
    },
    isSouthEastOf: function(testedCoords) {
      return this.row >= testedCoords.row && this.col >= testedCoords.col;
    },
    isNorthWestOf: function(testedCoords) {
      return this.row <= testedCoords.row && this.col <= testedCoords.col;
    },
    isSouthWestOf: function(testedCoords) {
      return this.row >= testedCoords.row && this.col <= testedCoords.col;
    },
    isNorthEastOf: function(testedCoords) {
      return this.row <= testedCoords.row && this.col >= testedCoords.col;
    }
  }, {});
  ;
  window.WalkontableCellCoords = WalkontableCellCoords;

//# 
},{}],6:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableCellRange: {get: function() {
      return WalkontableCellRange;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47_cell_47_coords_46_js__;
  var WalkontableCellCoords = ($___46__46__47_cell_47_coords_46_js__ = require("./../cell/coords.js"), $___46__46__47_cell_47_coords_46_js__ && $___46__46__47_cell_47_coords_46_js__.__esModule && $___46__46__47_cell_47_coords_46_js__ || {default: $___46__46__47_cell_47_coords_46_js__}).WalkontableCellCoords;
  var WalkontableCellRange = function WalkontableCellRange(highlight, from, to) {
    this.highlight = highlight;
    this.from = from;
    this.to = to;
  };
  var $WalkontableCellRange = WalkontableCellRange;
  ($traceurRuntime.createClass)(WalkontableCellRange, {
    isValid: function(wotInstance) {
      return this.from.isValid(wotInstance) && this.to.isValid(wotInstance);
    },
    isSingle: function() {
      return this.from.row === this.to.row && this.from.col === this.to.col;
    },
    getHeight: function() {
      return Math.max(this.from.row, this.to.row) - Math.min(this.from.row, this.to.row) + 1;
    },
    getWidth: function() {
      return Math.max(this.from.col, this.to.col) - Math.min(this.from.col, this.to.col) + 1;
    },
    includes: function(cellCoords) {
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      if (cellCoords.row < 0) {
        cellCoords.row = 0;
      }
      if (cellCoords.col < 0) {
        cellCoords.col = 0;
      }
      return topLeft.row <= cellCoords.row && bottomRight.row >= cellCoords.row && topLeft.col <= cellCoords.col && bottomRight.col >= cellCoords.col;
    },
    includesRange: function(testedRange) {
      return this.includes(testedRange.getTopLeftCorner()) && this.includes(testedRange.getBottomRightCorner());
    },
    isEqual: function(testedRange) {
      return (Math.min(this.from.row, this.to.row) == Math.min(testedRange.from.row, testedRange.to.row)) && (Math.max(this.from.row, this.to.row) == Math.max(testedRange.from.row, testedRange.to.row)) && (Math.min(this.from.col, this.to.col) == Math.min(testedRange.from.col, testedRange.to.col)) && (Math.max(this.from.col, this.to.col) == Math.max(testedRange.from.col, testedRange.to.col));
    },
    overlaps: function(testedRange) {
      return testedRange.isSouthEastOf(this.getTopLeftCorner()) && testedRange.isNorthWestOf(this.getBottomRightCorner());
    },
    isSouthEastOf: function(testedCoords) {
      return this.getTopLeftCorner().isSouthEastOf(testedCoords) || this.getBottomRightCorner().isSouthEastOf(testedCoords);
    },
    isNorthWestOf: function(testedCoords) {
      return this.getTopLeftCorner().isNorthWestOf(testedCoords) || this.getBottomRightCorner().isNorthWestOf(testedCoords);
    },
    expand: function(cellCoords) {
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      if (cellCoords.row < topLeft.row || cellCoords.col < topLeft.col || cellCoords.row > bottomRight.row || cellCoords.col > bottomRight.col) {
        this.from = new WalkontableCellCoords(Math.min(topLeft.row, cellCoords.row), Math.min(topLeft.col, cellCoords.col));
        this.to = new WalkontableCellCoords(Math.max(bottomRight.row, cellCoords.row), Math.max(bottomRight.col, cellCoords.col));
        return true;
      }
      return false;
    },
    expandByRange: function(expandingRange) {
      if (this.includesRange(expandingRange) || !this.overlaps(expandingRange)) {
        return false;
      }
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      var topRight = this.getTopRightCorner();
      var bottomLeft = this.getBottomLeftCorner();
      var expandingTopLeft = expandingRange.getTopLeftCorner();
      var expandingBottomRight = expandingRange.getBottomRightCorner();
      var resultTopRow = Math.min(topLeft.row, expandingTopLeft.row);
      var resultTopCol = Math.min(topLeft.col, expandingTopLeft.col);
      var resultBottomRow = Math.max(bottomRight.row, expandingBottomRight.row);
      var resultBottomCol = Math.max(bottomRight.col, expandingBottomRight.col);
      var finalFrom = new WalkontableCellCoords(resultTopRow, resultTopCol),
        finalTo = new WalkontableCellCoords(resultBottomRow, resultBottomCol);
      var isCorner = new $WalkontableCellRange(finalFrom, finalFrom, finalTo).isCorner(this.from, expandingRange),
        onlyMerge = expandingRange.isEqual(new $WalkontableCellRange(finalFrom, finalFrom, finalTo));
      if (isCorner && !onlyMerge) {
        if (this.from.col > finalFrom.col) {
          finalFrom.col = resultBottomCol;
          finalTo.col = resultTopCol;
        }
        if (this.from.row > finalFrom.row) {
          finalFrom.row = resultBottomRow;
          finalTo.row = resultTopRow;
        }
      }
      this.from = finalFrom;
      this.to = finalTo;
      return true;
    },
    getDirection: function() {
      if (this.from.isNorthWestOf(this.to)) {
        return 'NW-SE';
      } else if (this.from.isNorthEastOf(this.to)) {
        return 'NE-SW';
      } else if (this.from.isSouthEastOf(this.to)) {
        return 'SE-NW';
      } else if (this.from.isSouthWestOf(this.to)) {
        return 'SW-NE';
      }
    },
    setDirection: function(direction) {
      switch (direction) {
        case 'NW-SE':
          this.from = this.getTopLeftCorner();
          this.to = this.getBottomRightCorner();
          break;
        case 'NE-SW':
          this.from = this.getTopRightCorner();
          this.to = this.getBottomLeftCorner();
          break;
        case 'SE-NW':
          this.from = this.getBottomRightCorner();
          this.to = this.getTopLeftCorner();
          break;
        case 'SW-NE':
          this.from = this.getBottomLeftCorner();
          this.to = this.getTopRightCorner();
          break;
      }
    },
    getTopLeftCorner: function() {
      return new WalkontableCellCoords(Math.min(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
    },
    getBottomRightCorner: function() {
      return new WalkontableCellCoords(Math.max(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
    },
    getTopRightCorner: function() {
      return new WalkontableCellCoords(Math.min(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
    },
    getBottomLeftCorner: function() {
      return new WalkontableCellCoords(Math.max(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
    },
    isCorner: function(coords, expandedRange) {
      if (expandedRange) {
        if (expandedRange.includes(coords)) {
          if (this.getTopLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.from.col)) || this.getTopRightCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.to.col)) || this.getBottomLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.from.col)) || this.getBottomRightCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.to.col))) {
            return true;
          }
        }
      }
      return coords.isEqual(this.getTopLeftCorner()) || coords.isEqual(this.getTopRightCorner()) || coords.isEqual(this.getBottomLeftCorner()) || coords.isEqual(this.getBottomRightCorner());
    },
    getOppositeCorner: function(coords, expandedRange) {
      if (!(coords instanceof WalkontableCellCoords)) {
        return false;
      }
      if (expandedRange) {
        if (expandedRange.includes(coords)) {
          if (this.getTopLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.from.col))) {
            return this.getBottomRightCorner();
          }
          if (this.getTopRightCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.to.col))) {
            return this.getBottomLeftCorner();
          }
          if (this.getBottomLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.from.col))) {
            return this.getTopRightCorner();
          }
          if (this.getBottomRightCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.to.col))) {
            return this.getTopLeftCorner();
          }
        }
      }
      if (coords.isEqual(this.getBottomRightCorner())) {
        return this.getTopLeftCorner();
      } else if (coords.isEqual(this.getTopLeftCorner())) {
        return this.getBottomRightCorner();
      } else if (coords.isEqual(this.getTopRightCorner())) {
        return this.getBottomLeftCorner();
      } else if (coords.isEqual(this.getBottomLeftCorner())) {
        return this.getTopRightCorner();
      }
    },
    getBordersSharedWith: function(range) {
      if (!this.includesRange(range)) {
        return [];
      }
      var thisBorders = {
        top: Math.min(this.from.row, this.to.row),
        bottom: Math.max(this.from.row, this.to.row),
        left: Math.min(this.from.col, this.to.col),
        right: Math.max(this.from.col, this.to.col)
      };
      var rangeBorders = {
        top: Math.min(range.from.row, range.to.row),
        bottom: Math.max(range.from.row, range.to.row),
        left: Math.min(range.from.col, range.to.col),
        right: Math.max(range.from.col, range.to.col)
      };
      var result = [];
      if (thisBorders.top == rangeBorders.top) {
        result.push('top');
      }
      if (thisBorders.right == rangeBorders.right) {
        result.push('right');
      }
      if (thisBorders.bottom == rangeBorders.bottom) {
        result.push('bottom');
      }
      if (thisBorders.left == rangeBorders.left) {
        result.push('left');
      }
      return result;
    },
    getInner: function() {
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      var out = [];
      for (var r = topLeft.row; r <= bottomRight.row; r++) {
        for (var c = topLeft.col; c <= bottomRight.col; c++) {
          if (!(this.from.row === r && this.from.col === c) && !(this.to.row === r && this.to.col === c)) {
            out.push(new WalkontableCellCoords(r, c));
          }
        }
      }
      return out;
    },
    getAll: function() {
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      var out = [];
      for (var r = topLeft.row; r <= bottomRight.row; r++) {
        for (var c = topLeft.col; c <= bottomRight.col; c++) {
          if (topLeft.row === r && topLeft.col === c) {
            out.push(topLeft);
          } else if (bottomRight.row === r && bottomRight.col === c) {
            out.push(bottomRight);
          } else {
            out.push(new WalkontableCellCoords(r, c));
          }
        }
      }
      return out;
    },
    forAll: function(callback) {
      var topLeft = this.getTopLeftCorner();
      var bottomRight = this.getBottomRightCorner();
      for (var r = topLeft.row; r <= bottomRight.row; r++) {
        for (var c = topLeft.col; c <= bottomRight.col; c++) {
          var breakIteration = callback(r, c);
          if (breakIteration === false) {
            return;
          }
        }
      }
    }
  }, {});
  ;
  window.WalkontableCellRange = WalkontableCellRange;

//# 
},{"./../cell/coords.js":5}],7:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    Walkontable: {get: function() {
      return Walkontable;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___46__46__47__46__46__47__46__46__47_helpers_46_js__,
    $___46__46__47__46__46__47__46__46__47_helpers_46_js__,
    $__event_46_js__,
    $__overlays_46_js__,
    $__scroll_46_js__,
    $__settings_46_js__,
    $__table_46_js__,
    $__viewport_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../dom.js"), $___46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_dom_46_js__});
  var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_46_js__ = require("./../../../helpers.js"), $___46__46__47__46__46__47__46__46__47_helpers_46_js__ && $___46__46__47__46__46__47__46__46__47_helpers_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_46_js__}),
    objectEach = $__0.objectEach,
    toUpperCaseFirst = $__0.toUpperCaseFirst;
  var randomString = ($___46__46__47__46__46__47__46__46__47_helpers_46_js__ = require("./../../../helpers.js"), $___46__46__47__46__46__47__46__46__47_helpers_46_js__ && $___46__46__47__46__46__47__46__46__47_helpers_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_46_js__}).randomString;
  var WalkontableEvent = ($__event_46_js__ = require("./event.js"), $__event_46_js__ && $__event_46_js__.__esModule && $__event_46_js__ || {default: $__event_46_js__}).WalkontableEvent;
  var WalkontableOverlays = ($__overlays_46_js__ = require("./overlays.js"), $__overlays_46_js__ && $__overlays_46_js__.__esModule && $__overlays_46_js__ || {default: $__overlays_46_js__}).WalkontableOverlays;
  var WalkontableScroll = ($__scroll_46_js__ = require("./scroll.js"), $__scroll_46_js__ && $__scroll_46_js__.__esModule && $__scroll_46_js__ || {default: $__scroll_46_js__}).WalkontableScroll;
  var WalkontableSettings = ($__settings_46_js__ = require("./settings.js"), $__settings_46_js__ && $__settings_46_js__.__esModule && $__settings_46_js__ || {default: $__settings_46_js__}).WalkontableSettings;
  var WalkontableTable = ($__table_46_js__ = require("./table.js"), $__table_46_js__ && $__table_46_js__.__esModule && $__table_46_js__ || {default: $__table_46_js__}).WalkontableTable;
  var WalkontableViewport = ($__viewport_46_js__ = require("./viewport.js"), $__viewport_46_js__ && $__viewport_46_js__.__esModule && $__viewport_46_js__ || {default: $__viewport_46_js__}).WalkontableViewport;
  var Walkontable = function Walkontable(settings) {
    var originalHeaders = [];
    this.guid = 'wt_' + randomString();
    if (settings.cloneSource) {
      this.cloneSource = settings.cloneSource;
      this.cloneOverlay = settings.cloneOverlay;
      this.wtSettings = settings.cloneSource.wtSettings;
      this.wtTable = new WalkontableTable(this, settings.table, settings.wtRootElement);
      this.wtScroll = new WalkontableScroll(this);
      this.wtViewport = settings.cloneSource.wtViewport;
      this.wtEvent = new WalkontableEvent(this);
      this.selections = this.cloneSource.selections;
    } else {
      this.wtSettings = new WalkontableSettings(this, settings);
      this.wtTable = new WalkontableTable(this, settings.table);
      this.wtScroll = new WalkontableScroll(this);
      this.wtViewport = new WalkontableViewport(this);
      this.wtEvent = new WalkontableEvent(this);
      this.selections = this.getSetting('selections');
      this.wtOverlays = new WalkontableOverlays(this);
      this.exportSettingsAsClassNames();
    }
    if (this.wtTable.THEAD.childNodes.length && this.wtTable.THEAD.childNodes[0].childNodes.length) {
      for (var c = 0,
             clen = this.wtTable.THEAD.childNodes[0].childNodes.length; c < clen; c++) {
        originalHeaders.push(this.wtTable.THEAD.childNodes[0].childNodes[c].innerHTML);
      }
      if (!this.getSetting('columnHeaders').length) {
        this.update('columnHeaders', [function(column, TH) {
          dom.fastInnerText(TH, originalHeaders[column]);
        }]);
      }
    }
    this.drawn = false;
    this.drawInterrupted = false;
  };
  ($traceurRuntime.createClass)(Walkontable, {
    draw: function() {
      var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
      this.drawInterrupted = false;
      if (!fastDraw && !dom.isVisible(this.wtTable.TABLE)) {
        this.drawInterrupted = true;
      } else {
        this.wtTable.draw(fastDraw);
      }
      return this;
    },
    getCell: function(coords) {
      var topmost = arguments[1] !== (void 0) ? arguments[1] : false;
      if (!topmost) {
        return this.wtTable.getCell(coords);
      }
      var fixedRows = this.wtSettings.getSetting('fixedRowsTop');
      var fixedColumns = this.wtSettings.getSetting('fixedColumnsLeft');
      if (coords.row < fixedRows && coords.col < fixedColumns) {
        return this.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell(coords);
      } else if (coords.row < fixedRows) {
        return this.wtOverlays.topOverlay.clone.wtTable.getCell(coords);
      } else if (coords.col < fixedColumns) {
        return this.wtOverlays.leftOverlay.clone.wtTable.getCell(coords);
      }
      return this.wtTable.getCell(coords);
    },
    update: function(settings, value) {
      return this.wtSettings.update(settings, value);
    },
    scrollVertical: function(row) {
      this.wtOverlays.topOverlay.scrollTo(row);
      this.getSetting('onScrollVertically');
      return this;
    },
    scrollHorizontal: function(column) {
      this.wtOverlays.leftOverlay.scrollTo(column);
      this.getSetting('onScrollHorizontally');
      return this;
    },
    scrollViewport: function(coords) {
      this.wtScroll.scrollViewport(coords);
      return this;
    },
    getViewport: function() {
      return [this.wtTable.getFirstVisibleRow(), this.wtTable.getFirstVisibleColumn(), this.wtTable.getLastVisibleRow(), this.wtTable.getLastVisibleColumn()];
    },
    getOverlayName: function() {
      return this.cloneOverlay ? this.cloneOverlay.type : 'master';
    },
    exportSettingsAsClassNames: function() {
      var $__8 = this;
      var toExport = {
        rowHeaders: ['array'],
        columnHeaders: ['array']
      };
      var allClassNames = [];
      var newClassNames = [];
      objectEach(toExport, (function(optionType, key) {
        if (optionType.indexOf('array') > -1 && $__8.getSetting(key).length) {
          newClassNames.push('ht' + toUpperCaseFirst(key));
        }
        allClassNames.push('ht' + toUpperCaseFirst(key));
      }));
      dom.removeClass(this.wtTable.wtRootElement.parentNode, allClassNames);
      dom.addClass(this.wtTable.wtRootElement.parentNode, newClassNames);
    },
    getSetting: function(key, param1, param2, param3, param4) {
      return this.wtSettings.getSetting(key, param1, param2, param3, param4);
    },
    hasSetting: function(key) {
      return this.wtSettings.has(key);
    },
    destroy: function() {
      this.wtOverlays.destroy();
      this.wtEvent.destroy();
    }
  }, {});
  ;
  window.Walkontable = Walkontable;

//# 
},{"./../../../dom.js":27,"./../../../helpers.js":42,"./event.js":8,"./overlays.js":16,"./scroll.js":17,"./settings.js":19,"./table.js":20,"./viewport.js":22}],8:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableEvent: {get: function() {
      return WalkontableEvent;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___46__46__47__46__46__47__46__46__47_eventManager_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../dom.js"), $___46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_dom_46_js__});
  var eventManagerObject = ($___46__46__47__46__46__47__46__46__47_eventManager_46_js__ = require("./../../../eventManager.js"), $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager_46_js__}).eventManager;
  function WalkontableEvent(instance) {
    var that = this;
    var eventManager = eventManagerObject(instance);
    this.instance = instance;
    var dblClickOrigin = [null, null];
    this.dblClickTimeout = [null, null];
    var onMouseDown = function(event) {
      var cell = that.parentCell(event.realTarget);
      if (dom.hasClass(event.realTarget, 'corner')) {
        that.instance.getSetting('onCellCornerMouseDown', event, event.realTarget);
      } else if (cell.TD) {
        if (that.instance.hasSetting('onCellMouseDown')) {
          that.instance.getSetting('onCellMouseDown', event, cell.coords, cell.TD, that.instance);
        }
      }
      if (event.button !== 2) {
        if (cell.TD) {
          dblClickOrigin[0] = cell.TD;
          clearTimeout(that.dblClickTimeout[0]);
          that.dblClickTimeout[0] = setTimeout(function() {
            dblClickOrigin[0] = null;
          }, 1000);
        }
      }
    };
    var onTouchMove = function(event) {
      that.instance.touchMoving = true;
    };
    var longTouchTimeout;
    var onTouchStart = function(event) {
      var container = this;
      eventManager.addEventListener(this, 'touchmove', onTouchMove);
      that.checkIfTouchMove = setTimeout(function() {
        if (that.instance.touchMoving === true) {
          that.instance.touchMoving = void 0;
          eventManager.removeEventListener("touchmove", onTouchMove, false);
          return;
        } else {
          onMouseDown(event);
        }
      }, 30);
    };
    var lastMouseOver;
    var onMouseOver = function(event) {
      var table,
        td;
      if (that.instance.hasSetting('onCellMouseOver')) {
        table = that.instance.wtTable.TABLE;
        td = dom.closest(event.realTarget, ['TD', 'TH'], table);
        if (td && td !== lastMouseOver && dom.isChildOf(td, table)) {
          lastMouseOver = td;
          that.instance.getSetting('onCellMouseOver', event, that.instance.wtTable.getCoords(td), td, that.instance);
        }
      }
    };
    var onMouseUp = function(event) {
      if (event.button !== 2) {
        var cell = that.parentCell(event.realTarget);
        if (cell.TD === dblClickOrigin[0] && cell.TD === dblClickOrigin[1]) {
          if (dom.hasClass(event.realTarget, 'corner')) {
            that.instance.getSetting('onCellCornerDblClick', event, cell.coords, cell.TD, that.instance);
          } else {
            that.instance.getSetting('onCellDblClick', event, cell.coords, cell.TD, that.instance);
          }
          dblClickOrigin[0] = null;
          dblClickOrigin[1] = null;
        } else if (cell.TD === dblClickOrigin[0]) {
          dblClickOrigin[1] = cell.TD;
          clearTimeout(that.dblClickTimeout[1]);
          that.dblClickTimeout[1] = setTimeout(function() {
            dblClickOrigin[1] = null;
          }, 500);
        }
      }
    };
    var onTouchEnd = function(event) {
      clearTimeout(longTouchTimeout);
      event.preventDefault();
      onMouseUp(event);
    };
    eventManager.addEventListener(this.instance.wtTable.holder, 'mousedown', onMouseDown);
    eventManager.addEventListener(this.instance.wtTable.TABLE, 'mouseover', onMouseOver);
    eventManager.addEventListener(this.instance.wtTable.holder, 'mouseup', onMouseUp);
    if (this.instance.wtTable.holder.parentNode.parentNode && Handsontable.mobileBrowser && !that.instance.wtTable.isWorkingOnClone()) {
      var classSelector = "." + this.instance.wtTable.holder.parentNode.className.split(" ").join(".");
      eventManager.addEventListener(this.instance.wtTable.holder, 'touchstart', function(event) {
        that.instance.touchApplied = true;
        if (dom.isChildOf(event.target, classSelector)) {
          onTouchStart.call(event.target, event);
        }
      });
      eventManager.addEventListener(this.instance.wtTable.holder, 'touchend', function(event) {
        that.instance.touchApplied = false;
        if (dom.isChildOf(event.target, classSelector)) {
          onTouchEnd.call(event.target, event);
        }
      });
      if (!that.instance.momentumScrolling) {
        that.instance.momentumScrolling = {};
      }
      eventManager.addEventListener(this.instance.wtTable.holder, 'scroll', function(event) {
        clearTimeout(that.instance.momentumScrolling._timeout);
        if (!that.instance.momentumScrolling.ongoing) {
          that.instance.getSetting('onBeforeTouchScroll');
        }
        that.instance.momentumScrolling.ongoing = true;
        that.instance.momentumScrolling._timeout = setTimeout(function() {
          if (!that.instance.touchApplied) {
            that.instance.momentumScrolling.ongoing = false;
            that.instance.getSetting('onAfterMomentumScroll');
          }
        }, 200);
      });
    }
    eventManager.addEventListener(window, 'resize', function() {
      if (that.instance.getSetting('stretchH') !== 'none') {
        that.instance.draw();
      }
    });
    this.destroy = function() {
      clearTimeout(this.dblClickTimeout[0]);
      clearTimeout(this.dblClickTimeout[1]);
      eventManager.destroy();
    };
  }
  WalkontableEvent.prototype.parentCell = function(elem) {
    var cell = {};
    var TABLE = this.instance.wtTable.TABLE;
    var TD = dom.closest(elem, ['TD', 'TH'], TABLE);
    if (TD && dom.isChildOf(TD, TABLE)) {
      cell.coords = this.instance.wtTable.getCoords(TD);
      cell.TD = TD;
    } else if (dom.hasClass(elem, 'wtBorder') && dom.hasClass(elem, 'current')) {
      cell.coords = this.instance.selections.current.cellRange.highlight;
      cell.TD = this.instance.wtTable.getCell(cell.coords);
    } else if (dom.hasClass(elem, 'wtBorder') && dom.hasClass(elem, 'area')) {
      if (this.instance.selections.area.cellRange) {
        cell.coords = this.instance.selections.area.cellRange.to;
        cell.TD = this.instance.wtTable.getCell(cell.coords);
      }
    }
    return cell;
  };
  ;
  window.WalkontableEvent = WalkontableEvent;

//# 
},{"./../../../dom.js":27,"./../../../eventManager.js":41}],9:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableColumnFilter: {get: function() {
      return WalkontableColumnFilter;
    }},
    __esModule: {value: true}
  });
  var WalkontableColumnFilter = function WalkontableColumnFilter(offset, total, countTH) {
    this.offset = offset;
    this.total = total;
    this.countTH = countTH;
  };
  ($traceurRuntime.createClass)(WalkontableColumnFilter, {
    offsetted: function(index) {
      return index + this.offset;
    },
    unOffsetted: function(index) {
      return index - this.offset;
    },
    renderedToSource: function(index) {
      return this.offsetted(index);
    },
    sourceToRendered: function(index) {
      return this.unOffsetted(index);
    },
    offsettedTH: function(index) {
      return index - this.countTH;
    },
    unOffsettedTH: function(index) {
      return index + this.countTH;
    },
    visibleRowHeadedColumnToSourceColumn: function(index) {
      return this.renderedToSource(this.offsettedTH(index));
    },
    sourceColumnToVisibleRowHeadedColumn: function(index) {
      return this.unOffsettedTH(this.sourceToRendered(index));
    }
  }, {});
  ;
  window.WalkontableColumnFilter = WalkontableColumnFilter;

//# 
},{}],10:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableRowFilter: {get: function() {
      return WalkontableRowFilter;
    }},
    __esModule: {value: true}
  });
  var WalkontableRowFilter = function WalkontableRowFilter(offset, total, countTH) {
    this.offset = offset;
    this.total = total;
    this.countTH = countTH;
  };
  ($traceurRuntime.createClass)(WalkontableRowFilter, {
    offsetted: function(index) {
      return index + this.offset;
    },
    unOffsetted: function(index) {
      return index - this.offset;
    },
    renderedToSource: function(index) {
      return this.offsetted(index);
    },
    sourceToRendered: function(index) {
      return this.unOffsetted(index);
    },
    offsettedTH: function(index) {
      return index - this.countTH;
    },
    unOffsettedTH: function(index) {
      return index + this.countTH;
    },
    visibleColHeadedRowToSourceRow: function(index) {
      return this.renderedToSource(this.offsettedTH(index));
    },
    sourceRowToVisibleColHeadedRow: function(index) {
      return this.unOffsettedTH(this.sourceToRendered(index));
    }
  }, {});
  ;
  window.WalkontableRowFilter = WalkontableRowFilter;

//# 
},{}],11:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableOverlay: {get: function() {
      return WalkontableOverlay;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__,
    $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../../dom.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__});
  var defineGetter = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__ = require("./../../../../helpers.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_46_js__}).defineGetter;
  var eventManagerObject = ($___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__ = require("./../../../../eventManager.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager_46_js__}).eventManager;
  var WalkontableOverlay = function WalkontableOverlay(wotInstance) {
    defineGetter(this, 'wot', wotInstance, {writable: false});
    this.instance = this.wot;
    this.type = '';
    this.TABLE = this.wot.wtTable.TABLE;
    this.hider = this.wot.wtTable.hider;
    this.spreader = this.wot.wtTable.spreader;
    this.holder = this.wot.wtTable.holder;
    this.wtRootElement = this.wot.wtTable.wtRootElement;
    this.trimmingContainer = dom.getTrimmingContainer(this.hider.parentNode.parentNode);
    this.mainTableScrollableElement = dom.getScrollableElement(this.wot.wtTable.TABLE);
    this.needFullRender = this.shouldBeRendered();
    this.isElementSizesAdjusted = false;
  };
  var $WalkontableOverlay = WalkontableOverlay;
  ($traceurRuntime.createClass)(WalkontableOverlay, {
    shouldBeRendered: function() {
      return true;
    },
    makeClone: function(direction) {
      if ($WalkontableOverlay.CLONE_TYPES.indexOf(direction) === -1) {
        throw new Error('Clone type "' + direction + '" is not supported.');
      }
      var clone = document.createElement('DIV');
      var clonedTable = document.createElement('TABLE');
      clone.className = 'ht_clone_' + direction + ' handsontable';
      clone.style.position = 'absolute';
      clone.style.top = 0;
      clone.style.left = 0;
      clone.style.overflow = 'hidden';
      clonedTable.className = this.wot.wtTable.TABLE.className;
      clone.appendChild(clonedTable);
      this.type = direction;
      this.wot.wtTable.wtRootElement.parentNode.appendChild(clone);
      return new Walkontable({
        cloneSource: this.wot,
        cloneOverlay: this,
        table: clonedTable
      });
    },
    refresh: function() {
      var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
      var nextCycleRenderFlag = this.shouldBeRendered();
      if (this.clone && (this.needFullRender || nextCycleRenderFlag)) {
        this.clone.draw(fastDraw);
      }
      this.needFullRender = nextCycleRenderFlag;
    },
    destroy: function() {
      eventManagerObject(this.clone).destroy();
    }
  }, {
    get CLONE_TOP() {
      return 'top';
    },
    get CLONE_LEFT() {
      return 'left';
    },
    get CLONE_CORNER() {
      return 'corner';
    },
    get CLONE_DEBUG() {
      return 'debug';
    },
    get CLONE_TYPES() {
      return [$WalkontableOverlay.CLONE_TOP, $WalkontableOverlay.CLONE_LEFT, $WalkontableOverlay.CLONE_CORNER, $WalkontableOverlay.CLONE_DEBUG];
    }
  });
  ;
  window.WalkontableOverlay = WalkontableOverlay;

//# 
},{"./../../../../dom.js":27,"./../../../../eventManager.js":41,"./../../../../helpers.js":42}],12:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableCornerOverlay: {get: function() {
      return WalkontableCornerOverlay;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___95_base_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../../dom.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__});
  var WalkontableOverlay = ($___95_base_46_js__ = require("./_base.js"), $___95_base_46_js__ && $___95_base_46_js__.__esModule && $___95_base_46_js__ || {default: $___95_base_46_js__}).WalkontableOverlay;
  var WalkontableCornerOverlay = function WalkontableCornerOverlay(wotInstance) {
    $traceurRuntime.superConstructor($WalkontableCornerOverlay).call(this, wotInstance);
    this.clone = this.makeClone(WalkontableOverlay.CLONE_CORNER);
  };
  var $WalkontableCornerOverlay = WalkontableCornerOverlay;
  ($traceurRuntime.createClass)(WalkontableCornerOverlay, {
    shouldBeRendered: function() {
      return (this.wot.getSetting('fixedRowsTop') || this.wot.getSetting('columnHeaders').length) && (this.wot.getSetting('fixedColumnsLeft') || this.wot.getSetting('rowHeaders').length) ? true : false;
    },
    resetFixedPosition: function() {
      if (!this.wot.wtTable.holder.parentNode) {
        return;
      }
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var tableHeight = dom.outerHeight(this.clone.wtTable.TABLE);
      var tableWidth = dom.outerWidth(this.clone.wtTable.TABLE);
      if (this.trimmingContainer === window) {
        var box = this.wot.wtTable.hider.getBoundingClientRect();
        var top = Math.ceil(box.top);
        var left = Math.ceil(box.left);
        var bottom = Math.ceil(box.bottom);
        var right = Math.ceil(box.right);
        var finalLeft;
        var finalTop;
        if (left < 0 && (right - overlayRoot.offsetWidth) > 0) {
          finalLeft = -left + 'px';
        } else {
          finalLeft = '0';
        }
        if (top < 0 && (bottom - overlayRoot.offsetHeight) > 0) {
          finalTop = -top + 'px';
        } else {
          finalTop = '0';
        }
        dom.setOverlayPosition(overlayRoot, finalLeft, finalTop);
      }
      overlayRoot.style.height = (tableHeight === 0 ? tableHeight : tableHeight + 4) + 'px';
      overlayRoot.style.width = (tableWidth === 0 ? tableWidth : tableWidth + 4) + 'px';
    }
  }, {}, WalkontableOverlay);
  ;
  window.WalkontableCornerOverlay = WalkontableCornerOverlay;

//# 
},{"./../../../../dom.js":27,"./_base.js":11}],13:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableDebugOverlay: {get: function() {
      return WalkontableDebugOverlay;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___95_base_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../../dom.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__});
  var WalkontableOverlay = ($___95_base_46_js__ = require("./_base.js"), $___95_base_46_js__ && $___95_base_46_js__.__esModule && $___95_base_46_js__ || {default: $___95_base_46_js__}).WalkontableOverlay;
  var WalkontableDebugOverlay = function WalkontableDebugOverlay(wotInstance) {
    $traceurRuntime.superConstructor($WalkontableDebugOverlay).call(this, wotInstance);
    this.clone = this.makeClone(WalkontableOverlay.CLONE_DEBUG);
    this.clone.wtTable.holder.style.opacity = 0.4;
    this.clone.wtTable.holder.style.textShadow = '0 0 2px #ff0000';
    dom.addClass(this.clone.wtTable.holder.parentNode, 'wtDebugVisible');
  };
  var $WalkontableDebugOverlay = WalkontableDebugOverlay;
  ($traceurRuntime.createClass)(WalkontableDebugOverlay, {}, {}, WalkontableOverlay);
  ;
  window.WalkontableDebugOverlay = WalkontableDebugOverlay;

//# 
},{"./../../../../dom.js":27,"./_base.js":11}],14:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableLeftOverlay: {get: function() {
      return WalkontableLeftOverlay;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___95_base_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../../dom.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__});
  var WalkontableOverlay = ($___95_base_46_js__ = require("./_base.js"), $___95_base_46_js__ && $___95_base_46_js__.__esModule && $___95_base_46_js__ || {default: $___95_base_46_js__}).WalkontableOverlay;
  var WalkontableLeftOverlay = function WalkontableLeftOverlay(wotInstance) {
    $traceurRuntime.superConstructor($WalkontableLeftOverlay).call(this, wotInstance);
    this.clone = this.makeClone(WalkontableOverlay.CLONE_LEFT);
  };
  var $WalkontableLeftOverlay = WalkontableLeftOverlay;
  ($traceurRuntime.createClass)(WalkontableLeftOverlay, {
    shouldBeRendered: function() {
      return this.wot.getSetting('fixedColumnsLeft') || this.wot.getSetting('rowHeaders').length ? true : false;
    },
    resetFixedPosition: function() {
      if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
        return;
      }
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var headerPosition = 0;
      if (this.trimmingContainer === window) {
        var box = this.wot.wtTable.hider.getBoundingClientRect();
        var left = Math.ceil(box.left);
        var right = Math.ceil(box.right);
        var finalLeft;
        var finalTop;
        finalTop = this.wot.wtTable.hider.style.top;
        finalTop = finalTop === '' ? 0 : finalTop;
        if (left < 0 && (right - overlayRoot.offsetWidth) > 0) {
          finalLeft = -left;
        } else {
          finalLeft = 0;
        }
        headerPosition = finalLeft;
        finalLeft = finalLeft + 'px';
        dom.setOverlayPosition(overlayRoot, finalLeft, finalTop);
      } else {
        headerPosition = this.getScrollPosition();
      }
      this.adjustHeaderBordersPosition(headerPosition);
    },
    setScrollPosition: function(pos) {
      if (this.mainTableScrollableElement === window) {
        window.scrollTo(pos, dom.getWindowScrollTop());
      } else {
        this.mainTableScrollableElement.scrollLeft = pos;
      }
    },
    onScroll: function() {
      this.wot.getSetting('onScrollHorizontally');
    },
    sumCellSizes: function(from, to) {
      var sum = 0;
      var defaultColumnWidth = this.wot.wtSettings.defaultColumnWidth;
      while (from < to) {
        sum += this.wot.wtTable.getStretchedColumnWidth(from) || defaultColumnWidth;
        from++;
      }
      return sum;
    },
    adjustElementsSize: function() {
      var force = arguments[0] !== (void 0) ? arguments[0] : false;
      if (this.needFullRender || force) {
        this.adjustRootElementSize();
        this.adjustRootChildsSize();
        if (!force) {
          this.isElementSizesAdjusted = true;
        }
      }
    },
    adjustRootElementSize: function() {
      var masterHolder = this.wot.wtTable.holder;
      var scrollbarHeight = masterHolder.clientHeight !== masterHolder.offsetHeight ? dom.getScrollbarWidth() : 0;
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;
      var tableWidth;
      if (this.trimmingContainer !== window) {
        overlayRootStyle.height = this.wot.wtViewport.getWorkspaceHeight() - scrollbarHeight + 'px';
      }
      this.clone.wtTable.holder.style.height = overlayRootStyle.height;
      tableWidth = dom.outerWidth(this.clone.wtTable.TABLE);
      overlayRootStyle.width = (tableWidth === 0 ? tableWidth : tableWidth + 4) + 'px';
    },
    adjustRootChildsSize: function() {
      var scrollbarWidth = dom.getScrollbarWidth();
      this.clone.wtTable.hider.style.height = this.hider.style.height;
      this.clone.wtTable.holder.style.height = this.clone.wtTable.holder.parentNode.style.height;
      if (scrollbarWidth === 0) {
        scrollbarWidth = 30;
      }
      this.clone.wtTable.holder.style.width = parseInt(this.clone.wtTable.holder.parentNode.style.width, 10) + scrollbarWidth + 'px';
    },
    applyToDOM: function() {
      var total = this.wot.getSetting('totalColumns');
      if (!this.isElementSizesAdjusted) {
        this.adjustElementsSize();
      }
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        this.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + 'px';
      } else if (total === 0) {
        this.spreader.style.left = '0';
      } else {
        throw new Error('Incorrect value of the columnsRenderCalculator');
      }
      this.spreader.style.right = '';
      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    },
    syncOverlayOffset: function() {
      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.clone.wtTable.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + 'px';
      } else {
        this.clone.wtTable.spreader.style.top = '';
      }
    },
    scrollTo: function(sourceCol, beyondRendered) {
      var newX = this.getTableParentOffset();
      var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var scrollbarCompensation = 0;
      if (beyondRendered && mainHolder.offsetWidth !== mainHolder.clientWidth) {
        scrollbarCompensation = dom.getScrollbarWidth();
      }
      if (beyondRendered) {
        newX += this.sumCellSizes(0, sourceCol + 1);
        newX -= this.wot.wtViewport.getViewportWidth();
      } else {
        newX += this.sumCellSizes(this.wot.getSetting('fixedColumnsLeft'), sourceCol);
      }
      newX += scrollbarCompensation;
      this.setScrollPosition(newX);
    },
    getTableParentOffset: function() {
      if (this.trimmingContainer === window) {
        return this.wot.wtTable.holderOffset.left;
      } else {
        return 0;
      }
    },
    getScrollPosition: function() {
      return dom.getScrollLeft(this.mainTableScrollableElement);
    },
    adjustHeaderBordersPosition: function(position) {
      var masterParent = this.wot.wtTable.holder.parentNode;
      var rowHeaders = this.wot.getSetting('rowHeaders');
      var fixedColumnsLeft = this.wot.getSetting('fixedColumnsLeft');
      if (fixedColumnsLeft && !rowHeaders.length) {
        dom.addClass(masterParent, 'innerBorderLeft');
      } else if (!fixedColumnsLeft && rowHeaders.length) {
        var previousState = dom.hasClass(masterParent, 'innerBorderLeft');
        if (position) {
          dom.addClass(masterParent, 'innerBorderLeft');
        } else {
          dom.removeClass(masterParent, 'innerBorderLeft');
        }
        if (!previousState && position || previousState && !position) {
          this.wot.wtOverlays.adjustElementsSize();
        }
      }
    }
  }, {}, WalkontableOverlay);
  ;
  window.WalkontableLeftOverlay = WalkontableLeftOverlay;

//# 
},{"./../../../../dom.js":27,"./_base.js":11}],15:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableTopOverlay: {get: function() {
      return WalkontableTopOverlay;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___95_base_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../../dom.js"), $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_dom_46_js__});
  var WalkontableOverlay = ($___95_base_46_js__ = require("./_base.js"), $___95_base_46_js__ && $___95_base_46_js__.__esModule && $___95_base_46_js__ || {default: $___95_base_46_js__}).WalkontableOverlay;
  var WalkontableTopOverlay = function WalkontableTopOverlay(wotInstance) {
    $traceurRuntime.superConstructor($WalkontableTopOverlay).call(this, wotInstance);
    this.clone = this.makeClone(WalkontableOverlay.CLONE_TOP);
  };
  var $WalkontableTopOverlay = WalkontableTopOverlay;
  ($traceurRuntime.createClass)(WalkontableTopOverlay, {
    shouldBeRendered: function() {
      return this.wot.getSetting('fixedRowsTop') || this.wot.getSetting('columnHeaders').length ? true : false;
    },
    resetFixedPosition: function() {
      if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
        return;
      }
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var headerPosition = 0;
      if (this.wot.wtOverlays.leftOverlay.trimmingContainer === window) {
        var box = this.wot.wtTable.hider.getBoundingClientRect();
        var top = Math.ceil(box.top);
        var bottom = Math.ceil(box.bottom);
        var finalLeft;
        var finalTop;
        finalLeft = this.wot.wtTable.hider.style.left;
        finalLeft = finalLeft === '' ? 0 : finalLeft;
        if (top < 0 && (bottom - overlayRoot.offsetHeight) > 0) {
          finalTop = -top;
        } else {
          finalTop = 0;
        }
        headerPosition = finalTop;
        finalTop = finalTop + 'px';
        dom.setOverlayPosition(overlayRoot, finalLeft, finalTop);
      } else {
        headerPosition = this.getScrollPosition();
      }
      this.adjustHeaderBordersPosition(headerPosition);
    },
    setScrollPosition: function(pos) {
      if (this.mainTableScrollableElement === window) {
        window.scrollTo(dom.getWindowScrollLeft(), pos);
      } else {
        this.mainTableScrollableElement.scrollTop = pos;
      }
    },
    onScroll: function() {
      this.wot.getSetting('onScrollVertically');
    },
    sumCellSizes: function(from, to) {
      var sum = 0;
      var defaultRowHeight = this.wot.wtSettings.settings.defaultRowHeight;
      while (from < to) {
        sum += this.wot.wtTable.getRowHeight(from) || defaultRowHeight;
        from++;
      }
      return sum;
    },
    adjustElementsSize: function() {
      var force = arguments[0] !== (void 0) ? arguments[0] : false;
      if (this.needFullRender || force) {
        this.adjustRootElementSize();
        this.adjustRootChildsSize();
        if (!force) {
          this.isElementSizesAdjusted = true;
        }
      }
    },
    adjustRootElementSize: function() {
      var masterHolder = this.wot.wtTable.holder;
      var scrollbarWidth = masterHolder.clientWidth !== masterHolder.offsetWidth ? dom.getScrollbarWidth() : 0;
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;
      var tableHeight;
      if (this.trimmingContainer !== window) {
        overlayRootStyle.width = this.wot.wtViewport.getWorkspaceWidth() - scrollbarWidth + 'px';
      }
      this.clone.wtTable.holder.style.width = overlayRootStyle.width;
      tableHeight = dom.outerHeight(this.clone.wtTable.TABLE);
      overlayRootStyle.height = (tableHeight === 0 ? tableHeight : tableHeight + 4) + 'px';
    },
    adjustRootChildsSize: function() {
      var scrollbarWidth = dom.getScrollbarWidth();
      this.clone.wtTable.hider.style.width = this.hider.style.width;
      this.clone.wtTable.holder.style.width = this.clone.wtTable.holder.parentNode.style.width;
      if (scrollbarWidth === 0) {
        scrollbarWidth = 30;
      }
      this.clone.wtTable.holder.style.height = parseInt(this.clone.wtTable.holder.parentNode.style.height, 10) + scrollbarWidth + 'px';
    },
    applyToDOM: function() {
      var total = this.wot.getSetting('totalRows');
      if (!this.isElementSizesAdjusted) {
        this.adjustElementsSize();
      }
      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + 'px';
      } else if (total === 0) {
        this.spreader.style.top = '0';
      } else {
        throw new Error("Incorrect value of the rowsRenderCalculator");
      }
      this.spreader.style.bottom = '';
      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    },
    syncOverlayOffset: function() {
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        this.clone.wtTable.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + 'px';
      } else {
        this.clone.wtTable.spreader.style.left = '';
      }
    },
    scrollTo: function(sourceRow, bottomEdge) {
      var newY = this.getTableParentOffset();
      var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var scrollbarCompensation = 0;
      if (bottomEdge && mainHolder.offsetHeight !== mainHolder.clientHeight) {
        scrollbarCompensation = dom.getScrollbarWidth();
      }
      if (bottomEdge) {
        newY += this.sumCellSizes(0, sourceRow + 1);
        newY -= this.wot.wtViewport.getViewportHeight();
        newY += 1;
      } else {
        newY += this.sumCellSizes(this.wot.getSetting('fixedRowsTop'), sourceRow);
      }
      newY += scrollbarCompensation;
      this.setScrollPosition(newY);
    },
    getTableParentOffset: function() {
      if (this.mainTableScrollableElement === window) {
        return this.wot.wtTable.holderOffset.top;
      } else {
        return 0;
      }
    },
    getScrollPosition: function() {
      return dom.getScrollTop(this.mainTableScrollableElement);
    },
    adjustHeaderBordersPosition: function(position) {
      if (this.wot.getSetting('fixedRowsTop') === 0 && this.wot.getSetting('columnHeaders').length > 0) {
        var masterParent = this.wot.wtTable.holder.parentNode;
        var previousState = dom.hasClass(masterParent, 'innerBorderTop');
        if (position) {
          dom.addClass(masterParent, 'innerBorderTop');
        } else {
          dom.removeClass(masterParent, 'innerBorderTop');
        }
        if (!previousState && position || previousState && !position) {
          this.wot.wtOverlays.adjustElementsSize();
        }
      }
      if (this.wot.getSetting('rowHeaders').length === 0) {
        var secondHeaderCell = this.clone.wtTable.THEAD.querySelector('th:nth-of-type(2)');
        if (secondHeaderCell) {
          secondHeaderCell.style['border-left-width'] = 0;
        }
      }
    }
  }, {}, WalkontableOverlay);
  ;
  window.WalkontableTopOverlay = WalkontableTopOverlay;

//# 
},{"./../../../../dom.js":27,"./_base.js":11}],16:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableOverlays: {get: function() {
      return WalkontableOverlays;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47_dom_46_js__,
    $___46__46__47__46__46__47__46__46__47_eventManager_46_js__,
    $__overlay_47_corner_46_js__,
    $__overlay_47_debug_46_js__,
    $__overlay_47_left_46_js__,
    $__overlay_47_top_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../dom.js"), $___46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_dom_46_js__});
  var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager_46_js__ = require("./../../../eventManager.js"), $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager_46_js__}).EventManager;
  var WalkontableCornerOverlay = ($__overlay_47_corner_46_js__ = require("./overlay/corner.js"), $__overlay_47_corner_46_js__ && $__overlay_47_corner_46_js__.__esModule && $__overlay_47_corner_46_js__ || {default: $__overlay_47_corner_46_js__}).WalkontableCornerOverlay;
  var WalkontableDebugOverlay = ($__overlay_47_debug_46_js__ = require("./overlay/debug.js"), $__overlay_47_debug_46_js__ && $__overlay_47_debug_46_js__.__esModule && $__overlay_47_debug_46_js__ || {default: $__overlay_47_debug_46_js__}).WalkontableDebugOverlay;
  var WalkontableLeftOverlay = ($__overlay_47_left_46_js__ = require("./overlay/left.js"), $__overlay_47_left_46_js__ && $__overlay_47_left_46_js__.__esModule && $__overlay_47_left_46_js__ || {default: $__overlay_47_left_46_js__}).WalkontableLeftOverlay;
  var WalkontableTopOverlay = ($__overlay_47_top_46_js__ = require("./overlay/top.js"), $__overlay_47_top_46_js__ && $__overlay_47_top_46_js__.__esModule && $__overlay_47_top_46_js__ || {default: $__overlay_47_top_46_js__}).WalkontableTopOverlay;
  var WalkontableOverlays = function WalkontableOverlays(wotInstance) {
    this.wot = wotInstance;
    this.instance = this.wot;
    this.eventManager = new EventManager(this.wot);
    this.wot.update('scrollbarWidth', dom.getScrollbarWidth());
    this.wot.update('scrollbarHeight', dom.getScrollbarWidth());
    this.mainTableScrollableElement = dom.getScrollableElement(this.wot.wtTable.TABLE);
    this.topOverlay = new WalkontableTopOverlay(this.wot);
    this.leftOverlay = new WalkontableLeftOverlay(this.wot);
    if (this.topOverlay.needFullRender && this.leftOverlay.needFullRender) {
      this.topLeftCornerOverlay = new WalkontableCornerOverlay(this.wot);
    }
    if (this.wot.getSetting('debug')) {
      this.debug = new WalkontableDebugOverlay(this.wot);
    }
    this.destroyed = false;
    this.keyPressed = false;
    this.spreaderLastSize = {
      width: null,
      height: null
    };
    this.overlayScrollPositions = {
      'master': {
        top: 0,
        left: 0
      },
      'top': {
        top: null,
        left: 0
      },
      'left': {
        top: 0,
        left: null
      }
    };
    this.registerListeners();
  };
  ($traceurRuntime.createClass)(WalkontableOverlays, {
    refreshAll: function() {
      if (!this.wot.drawn) {
        return;
      }
      if (!this.wot.wtTable.holder.parentNode) {
        this.destroy();
        return;
      }
      this.wot.draw(true);
      this.topOverlay.onScroll();
      this.leftOverlay.onScroll();
    },
    registerListeners: function() {
      var $__5 = this;
      this.eventManager.addEventListener(document.documentElement, 'keydown', (function() {
        return $__5.onKeyDown();
      }));
      this.eventManager.addEventListener(document.documentElement, 'keyup', (function() {
        return $__5.onKeyUp();
      }));
      this.eventManager.addEventListener(document, 'visibilitychange', (function() {
        return $__5.onKeyUp();
      }));
      this.eventManager.addEventListener(this.mainTableScrollableElement, 'scroll', (function(event) {
        return $__5.onTableScroll(event);
      }));
      if (this.topOverlay.needFullRender) {
        this.eventManager.addEventListener(this.topOverlay.clone.wtTable.holder, 'scroll', (function(event) {
          return $__5.onTableScroll(event);
        }));
        this.eventManager.addEventListener(this.topOverlay.clone.wtTable.holder, 'wheel', (function(event) {
          return $__5.onTableScroll(event);
        }));
      }
      if (this.leftOverlay.needFullRender) {
        this.eventManager.addEventListener(this.leftOverlay.clone.wtTable.holder, 'scroll', (function(event) {
          return $__5.onTableScroll(event);
        }));
        this.eventManager.addEventListener(this.leftOverlay.clone.wtTable.holder, 'wheel', (function(event) {
          return $__5.onTableScroll(event);
        }));
      }
      if (this.topOverlay.trimmingContainer !== window && this.leftOverlay.trimmingContainer !== window) {
        this.eventManager.addEventListener(window, 'wheel', (function(event) {
          var overlay;
          var deltaY = event.wheelDeltaY || event.deltaY;
          var deltaX = event.wheelDeltaX || event.deltaX;
          if ($__5.topOverlay.clone.wtTable.holder.contains(event.realTarget)) {
            overlay = 'top';
          } else if ($__5.leftOverlay.clone.wtTable.holder.contains(event.realTarget)) {
            overlay = 'left';
          }
          if (overlay == 'top' && deltaY !== 0) {
            event.preventDefault();
          } else if (overlay == 'left' && deltaX !== 0) {
            event.preventDefault();
          }
        }));
      }
    },
    onTableScroll: function(event) {
      if (Handsontable.mobileBrowser) {
        return;
      }
      if (this.keyPressed && this.mainTableScrollableElement !== window && !event.target.contains(this.mainTableScrollableElement)) {
        return;
      }
      if (event.type === 'scroll') {
        this.syncScrollPositions(event);
      } else {
        this.translateMouseWheelToScroll(event);
      }
    },
    onKeyDown: function() {
      this.keyPressed = true;
    },
    onKeyUp: function() {
      this.keyPressed = false;
    },
    translateMouseWheelToScroll: function(event) {
      var topOverlay = this.topOverlay.clone.wtTable.holder;
      var leftOverlay = this.leftOverlay.clone.wtTable.holder;
      var eventMockup = {type: 'wheel'};
      var tempElem = event.target;
      var deltaY = event.wheelDeltaY || (-1) * event.deltaY;
      var deltaX = event.wheelDeltaX || (-1) * event.deltaX;
      var parentHolder;
      while (tempElem != document && tempElem != null) {
        if (tempElem.className.indexOf('wtHolder') > -1) {
          parentHolder = tempElem;
          break;
        }
        tempElem = tempElem.parentNode;
      }
      eventMockup.target = parentHolder;
      if (parentHolder == topOverlay) {
        this.syncScrollPositions(eventMockup, (-0.2) * deltaY);
      } else if (parentHolder == leftOverlay) {
        this.syncScrollPositions(eventMockup, (-0.2) * deltaX);
      }
      return false;
    },
    syncScrollPositions: function(event) {
      var fakeScrollValue = arguments[1] !== (void 0) ? arguments[1] : null;
      if (this.destroyed) {
        return;
      }
      if (arguments.length === 0) {
        this.syncScrollWithMaster();
        return;
      }
      var master = this.mainTableScrollableElement;
      var target = event.target;
      var tempScrollValue = 0;
      var scrollValueChanged = false;
      var topOverlay;
      var leftOverlay;
      if (this.topOverlay.needFullRender) {
        topOverlay = this.topOverlay.clone.wtTable.holder;
      }
      if (this.leftOverlay.needFullRender) {
        leftOverlay = this.leftOverlay.clone.wtTable.holder;
      }
      if (target === document) {
        target = window;
      }
      if (target === master) {
        tempScrollValue = dom.getScrollLeft(target);
        if (this.overlayScrollPositions.master.left !== tempScrollValue) {
          this.overlayScrollPositions.master.left = tempScrollValue;
          scrollValueChanged = true;
          if (topOverlay) {
            topOverlay.scrollLeft = tempScrollValue;
          }
        }
        tempScrollValue = dom.getScrollTop(target);
        if (this.overlayScrollPositions.master.top !== tempScrollValue) {
          this.overlayScrollPositions.master.top = tempScrollValue;
          scrollValueChanged = true;
          if (leftOverlay) {
            leftOverlay.scrollTop = tempScrollValue;
          }
        }
      } else if (target === topOverlay) {
        tempScrollValue = dom.getScrollLeft(target);
        if (this.overlayScrollPositions.top.left !== tempScrollValue) {
          this.overlayScrollPositions.top.left = tempScrollValue;
          scrollValueChanged = true;
          master.scrollLeft = tempScrollValue;
        }
        if (fakeScrollValue !== null) {
          scrollValueChanged = true;
          master.scrollTop += fakeScrollValue;
        }
      } else if (target === leftOverlay) {
        tempScrollValue = dom.getScrollTop(target);
        if (this.overlayScrollPositions.left.top !== tempScrollValue) {
          this.overlayScrollPositions.left.top = tempScrollValue;
          scrollValueChanged = true;
          master.scrollTop = tempScrollValue;
        }
        if (fakeScrollValue !== null) {
          scrollValueChanged = true;
          master.scrollLeft += fakeScrollValue;
        }
      }
      if (!this.keyPressed && scrollValueChanged && event.type === 'scroll') {
        this.refreshAll();
      }
    },
    syncScrollWithMaster: function() {
      var master = this.topOverlay.mainTableScrollableElement;
      if (this.topOverlay.needFullRender) {
        this.topOverlay.clone.wtTable.holder.scrollLeft = master.scrollLeft;
      }
      if (this.leftOverlay.needFullRender) {
        this.leftOverlay.clone.wtTable.holder.scrollTop = master.scrollTop;
      }
    },
    destroy: function() {
      this.eventManager.destroy();
      this.topOverlay.destroy();
      this.leftOverlay.destroy();
      if (this.topLeftCornerOverlay) {
        this.topLeftCornerOverlay.destroy();
      }
      if (this.debug) {
        this.debug.destroy();
      }
      this.destroyed = true;
    },
    refresh: function() {
      var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
      if (this.topOverlay.isElementSizesAdjusted && this.leftOverlay.isElementSizesAdjusted) {
        var container = this.wot.wtTable.wtRootElement.parentNode || this.wot.wtTable.wtRootElement;
        var width = container.clientWidth;
        var height = container.clientHeight;
        if (width !== this.spreaderLastSize.width || height !== this.spreaderLastSize.height) {
          this.spreaderLastSize.width = width;
          this.spreaderLastSize.height = height;
          this.adjustElementsSize();
        }
      }
      this.leftOverlay.refresh(fastDraw);
      this.topOverlay.refresh(fastDraw);
      if (this.topLeftCornerOverlay) {
        this.topLeftCornerOverlay.refresh(fastDraw);
      }
      if (this.debug) {
        this.debug.refresh(fastDraw);
      }
    },
    adjustElementsSize: function() {
      var force = arguments[0] !== (void 0) ? arguments[0] : false;
      var totalColumns = this.wot.getSetting('totalColumns');
      var totalRows = this.wot.getSetting('totalRows');
      var headerRowSize = this.wot.wtViewport.getRowHeaderWidth();
      var headerColumnSize = this.wot.wtViewport.getColumnHeaderHeight();
      var hiderStyle = this.wot.wtTable.hider.style;
      hiderStyle.width = (headerRowSize + this.leftOverlay.sumCellSizes(0, totalColumns)) + 'px';
      hiderStyle.height = (headerColumnSize + this.topOverlay.sumCellSizes(0, totalRows) + 1) + 'px';
      this.topOverlay.adjustElementsSize(force);
      this.leftOverlay.adjustElementsSize(force);
    },
    applyToDOM: function() {
      if (!this.topOverlay.isElementSizesAdjusted || !this.leftOverlay.isElementSizesAdjusted) {
        this.adjustElementsSize();
      }
      this.topOverlay.applyToDOM();
      this.leftOverlay.applyToDOM();
    }
  }, {});
  ;
  window.WalkontableOverlays = WalkontableOverlays;

//# 
},{"./../../../dom.js":27,"./../../../eventManager.js":41,"./overlay/corner.js":12,"./overlay/debug.js":13,"./overlay/left.js":14,"./overlay/top.js":15}],17:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableScroll: {get: function() {
      return WalkontableScroll;
    }},
    __esModule: {value: true}
  });
  var WalkontableScroll = function WalkontableScroll(wotInstance) {
    this.wot = wotInstance;
    this.instance = wotInstance;
  };
  ($traceurRuntime.createClass)(WalkontableScroll, {scrollViewport: function(coords) {
    if (!this.wot.drawn) {
      return;
    }
    var totalRows = this.wot.getSetting('totalRows');
    var totalColumns = this.wot.getSetting('totalColumns');
    if (coords.row < 0 || coords.row > totalRows - 1) {
      throw new Error('row ' + coords.row + ' does not exist');
    }
    if (coords.col < 0 || coords.col > totalColumns - 1) {
      throw new Error('column ' + coords.col + ' does not exist');
    }
    if (coords.row > this.instance.wtTable.getLastVisibleRow()) {
      this.wot.wtOverlays.topOverlay.scrollTo(coords.row, true);
    } else if (coords.row >= this.instance.getSetting('fixedRowsTop') && coords.row < this.instance.wtTable.getFirstVisibleRow()) {
      this.wot.wtOverlays.topOverlay.scrollTo(coords.row);
    }
    if (coords.col > this.instance.wtTable.getLastVisibleColumn()) {
      this.wot.wtOverlays.leftOverlay.scrollTo(coords.col, true);
    } else if (coords.col >= this.instance.getSetting('fixedColumnsLeft') && coords.col < this.instance.wtTable.getFirstVisibleColumn()) {
      this.wot.wtOverlays.leftOverlay.scrollTo(coords.col);
    }
  }}, {});
  ;
  window.WalkontableScroll = WalkontableScroll;

//# 
},{}],18:[function(require,module,exports){
  "use strict";
  Object.defineProperties(exports, {
    WalkontableSelection: {get: function() {
      return WalkontableSelection;
    }},
    __esModule: {value: true}
  });
  var $___46__46__47__46__46__47__46__46__47_dom_46_js__,
    $__border_46_js__,
    $__cell_47_coords_46_js__,
    $__cell_47_range_46_js__;
  var dom = ($___46__46__47__46__46__47__46__46__47_dom_46_js__ = require("./../../../dom.js"), $___46__46__47__46__46__47__46__46__47_dom_46_js__ && $___46__46__47__46__46__47__46__46__47_dom_46_js__.__esModule && $___46__46__47__46__46__47__46__46__47_dom_46_js__ || {default: $___46__46__47__46__46__47__46__46__47_dom_46_js__});
  var WalkontableBorder = ($__border_46_js__ = require("./border.js"), $__border_46_js__ && $__border_46_js__.__esModule && $__border_46_js__ || {default: $__border_46_js__}).WalkontableBorder;
  var WalkontableCellCoords = ($__cell_47_coords_46_js__ = require("./cell/coords.js"), $__cell_47_coords_46_js__ && $__cell_47_coords_46_js__.__esModule && $__cell_47_coords_46_js__ || {default: $__cell_47_coords_46_js__}).WalkontableCellCoords;
  var WalkontableCellRange = ($__cell_47_range_46_js__ = require("./cell/range.js"), $__cell_47_range_46_js__ && $__cell_47_range_46_js__.__esModule && $__cell_47_range_46_js__ || {default: $__cell_47_range_46_js__}).WalkontableCellRange;
  var WalkontableSelection = function WalkontableSelection(settings, cellRange) {
    this.settings = settings;
    this.cellRange = cellRange || null;
    this.instanceBorders = {};
  };
  ($traceurRuntime.createClass)(WalkontableSelection, {
    getBorder: function(wotInstance) {
      if (this.instanceBorders[wotInstance.guid]) {
        return this.instanceBorders[wotInstance.guid];
      }
      this.instanceBorders[wotInstance.guid] = new WalkontableBorder(wotInstance, this.settings);
    },
    isEmpty: function() {
      return this.cellRange === null;
    },
    add: function(coords) {
      if (this.isEmpty()) {
        this.cellRange = new WalkontableCellRange(coords, coords, coords);
      } else {
        this.cellRange.expand(coords);
      }
    },
    replace: function(oldCoords, newCoords) {
      if (!this.isEmpty()) {
        if (this.cellRange.from.isEqual(oldCoords)) {
          this.cellRange.from = newCoords;
          return true;
        }
        if (this.cellRange.to.isEqual(oldCoords)) {
          this.cellRange.to = newCoords;
          return true;
        }
      }
      return false;
    },
    clear: function() {
      this.cellRange = null;
    },
    getCorners: function() {
      var topLeft = this.cellRange.getTopLeftCorner();
      var bottomRight = this.cellRange.getBottomRightCorner();
      return [topLeft.row, topLeft.col, bottomRight.row, bottomRight.col];
    },
    addClassAtCoords: function(wotInstance, sourceRow, sourceColumn, className) {
      var TD = wotInstance.wtTable.getCell(new WalkontableCellCoords(sourceRow, sourceColumn));
      if (typeof TD === 'object') {
        dom.addClass(TD, className);
      }
    },
    draw: function(wotInstance) {
      if (this.isEmpty()) {
        if (this.settings.border) {
          var border = this.getBorder(wotInstance);
          if (border) {
            border.disappear();
          }
        }
        return;
      }
      var renderedRows = wotInstance.wtTable.getRenderedRowsCount();
      var renderedColumns = wotInstance.wtTable.getRenderedColumnsCount();
      var corners = this.getCorners();
      var sourceRow,
        sourceCol,
        TH;
      for (var column = 0; column < renderedColumns; column++) {
        sourceCol = wotInstance.wtTable.columnFilter.renderedToSource(column);
        if (sourceCol >= corners[1] && sourceCol <= corners[3]) {
          TH = wotInstance.wtTable.getColumnHeader(sourceCol);
          if (TH && this.settings.highlightColumnClassName) {
            dom.addClass(TH, this.settings.highlightColumnClassName);
          }
        }
      }
      for (var row = 0; row < renderedRows; row++) {
        sourceRow = wotInstance.wtTable.rowFilter.renderedToSource(row);
        if (sourceRow >= corners[0] && sourceRow <= corners[2]) {
          TH = wotInstance.wtTable.getRowHeader(sourceRow);
          if (TH && this.settings.highlightRowClassName) {
            dom.addCl