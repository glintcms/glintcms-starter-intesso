// router
var page = require('page.js');

// routes
// auth is done completely on the server ;-)
require('page-i18n')();
require('page-article')();
require('page-articles')();
require('page-project')();
require('page-projects')();
require('page-contact')();
require('page-filemanager')();
require('page-upload')();
require('page-translate')();
require('page-home')();

// initialize page.js router
page({
  click: false
  //,dispatch: false
  //,decodeURLComponents : false
});

// initialize socket.io communication
//var io = window.io = require('glint-socket-io').io;
//var socket = window.socket = require('glint-socket-io')();
