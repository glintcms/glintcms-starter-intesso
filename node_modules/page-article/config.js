exports.identifier = 'page-article';

exports.route = '/articles/:article';

exports.dataTemplate = '__template__';

exports.place = process.env.GLINT_PLACE || 'browser';