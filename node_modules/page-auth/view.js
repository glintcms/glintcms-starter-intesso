var fs = require('fs');
var jade = require('jade');
var Widget = require('glint-widget');
var Wrap = require('glint-wrap');
var i18n = require('glint-plugin-wrap-i18n');
var LayoutWrap = require('wrap-layout');

exports = module.exports = function view(o) {

  var template = {
    login: fs.readFileSync(__dirname + '/views/login.jade', 'utf-8'),
    signup: fs.readFileSync(__dirname + '/views/signup.jade', 'utf-8'),
    signin: fs.readFileSync(__dirname + '/views/signin.jade', 'utf-8'),
    account: fs.readFileSync(__dirname + '/views/account.jade', 'utf-8'),
    forgot: fs.readFileSync(__dirname + '/views/forgot.jade', 'utf-8'),
    reset: fs.readFileSync(__dirname + '/views/reset.jade', 'utf-8'),
    flash: fs.readFileSync(__dirname + '/views/flash.jade', 'utf-8'),
    layout: fs.readFileSync(__dirname + '/views/layout.jade', 'utf-8'),
  };

  var widget = {
    Login: function() {
      return Widget(function(options) {
        return jade.render(template.login, options);
      })
    },
    Signup: function() {
      return Widget(function(options) {
        return jade.render(template.signup, options);
      })
    },
    Signin: function() {
      return Widget(function(options) {
        return jade.render(template.signin, options);
      })
    },
    Account: function() {
      return Widget(function(options) {
        return jade.render(template.account, options);
      })
    },
    Forgot: function() {
      return Widget(function(options) {
        return jade.render(template.forgot, options);
      })
    },
    Reset: function() {
      return Widget(function(options) {
        return jade.render(template.reset, options);
      })
    },
    Flash: function() {
      return Widget(function(options) {
        return jade.render(template.flash, options);
      })
    },
    Layout: function() {
      return Widget(function(options) {
        return jade.render(template.layout, options);
      })
    }
  };

  function wrap() {
    return new Wrap().use(i18n({translate: 'page'}));
  }

  exports.login = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Login')
    .series('authContent', widget.Login())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.account = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Account')
    .series('authContent', widget.Account())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.forgot = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Forgot-Password')
    .series('authContent', widget.Forgot())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.signup = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Signup')
    .series('authContent', widget.Signup())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.signin = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Get-Access')
    .series('authContent', widget.Signin())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.reset = wrap()
    .use(i18n({translate: 'page'}))
    .defaults('title', 'i18n-Password-Reset')
    .series('authContent', widget.Reset())
    .series('authFlash', widget.Flash())
    .series('content', widget.Layout())
    .series(LayoutWrap())
    .place('force:server')
  ;

  exports.widget = widget;
  exports.template = template;

  return exports;

};
