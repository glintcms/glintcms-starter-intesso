/*
 * modules / dependencies
 */
var page = require('page.js');
var PageConfig = require('page-config');

var PageFilemanager = require('page-filemanager');
var PageUpload = require('page-upload');
var PageTranslate = require('page-translate');
var PageI18n = require('page-i18n');

var PageArticle = require('page-article');
var PageArticles = require('page-articles');
var PageProject = require('page-project');
var PageProjects = require('page-projects');
var PageContact = require('page-contact');
var PageHome = require('page-home');


/*
 * variables
 */
var root = !module.exports.length;

/**
 * glintcms application
 *
 * @param options Object
 */
module.exports = function glintcms(options) {

  // get options
  var o = PageConfig(options);

  // routes
  // auth is done completely on the server ;-)
  PageI18n(o.i18n);
  PageArticle(o.article);
  PageArticles(o.articles);
  PageProject(o.project);
  PageProjects(o.projects);
  PageContact(o.contact);
  PageFilemanager(o.filemanager);
  PageUpload(o.upload);
  PageTranslate(o.translate);
  PageHome(o.home);

  // initialize page.js router
  page(o.browser || {
      click: false,
      dispatch: true,
      decodeURLComponents: false
    });

  // initialize socket.io communication
  //var io = window.io = require('glint-socket-io').io;
  //var socket = window.socket = require('glint-socket-io')();

};

if (root) module.exports();