var Query = require('mingo');
var Adapter = require('glint-adapter');
var Dates = require('glint-plugin-adapter-dates');
var PageAdapter = require('page-adapter');
var model = require('modella');
var Storage = require('modella-glint');
var Auth = require('modella-auth');
var uuid = require('uuid');
var crypto = require('crypto');

var adapter = Adapter(PageAdapter()).db('glint').use(Dates());

// define schema
var User = model('user');

User
  .attr('id')
  .attr('email', {required: true, format: 'email'})
  .attr('password', {required: true})

  .attr('facebook')
  .attr('twitter')
  .attr('github')
  .attr('instagram')
  .attr('linkedin')

  .attr('profileName', {defaultValue: ''})
  .attr('profileGender', {defaultValue: ''})
  .attr('profileLocation', {defaultValue: ''})
  .attr('profileWebsite', {defaultValue: ''})
  .attr('profilePicture', {defaultValue: ''})

  .attr('tokens', {defaultValue: []})
  .attr('resetPasswordToken')
  .attr('resetPasswordExpires')

//User.primaryKey = 'email';

User.on('saving', function(user, done) {
  if (!user || !user.primary) return done();
  if (!user.primary()) user.primary(uuid.v1());
  return done();
});

// add methods

User.findById = function(id, fn) {
  User.load(id, fn);
};

User.findOne = function(query, fn) {
  User.find(query, function(err, result) {
    if (err) return fn(err);
    if (result.length > 0) return fn(null, result[0]);
    return fn(null, null);
  });
};

User.gravatar = function(user, size) {
  if (!size) size = 200;
  if (!user.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(user.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};


// add plugins
function changePassword(Model) {
  Model.prototype.changePassword = function(newPassword) {
    this.set({salt: undefined});
    this.set({password: newPassword});
  };
}

function gravatar(Model) {
  Model.prototype.gravatar = function(size) {
    if (!size) size = 200;
    if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
  };
}

User
  .use(Auth())
  .use(Storage(adapter))
  .use(changePassword)
  .use(gravatar)

exports = module.exports = User;
