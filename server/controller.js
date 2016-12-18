var db = require('../data/database.js');
var poll = require('./worker.js').poll;
var Pet = db.Pet;
var User = db.User;
var Log = db.Log;
var bcrypt = require('bcryptjs');
var moment = require('moment');



/********** Image Assets **********/
var lvl1 = {
  coding: 'coding1',
  sleeping: 'sleeping1',
  playing: 'playing1',
  eating: 'eating1'
};

var lvl2 = {
  coding: 'coding2',
  sleeping: 'sleeping2',
  playing: 'playing2',
  eating: 'eating2'
};

var lvl3 = {
  coding: 'coding3',
  sleeping: 'coding3',
  playing: 'coding3',
  eating: 'coding3'
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2,
  lvl3: lvl3
};

module.exports = {
  /********** Pet Functions **********/
  user: null,
  interval: null,
  get: function(req, res, next) {
    console.log('id', req.session.user.userId);
    Pet.findOne({ where: {userId: req.session.user.userId}})
      .then(function(query) {
        console.log('query.dataValues', query.dataValues);
        console.log('pet', query.dataValues.name);
        var pet = query.dataValues;
        res.statusCode = 200;
        res.json(pet);
      });
  },
  post: function(req, res, next) {
    Pet.findOne({ where: {userId: req.session.user.userId}})
      .then(function(pet) {
        if (pet) {
          var newStatus = req.body.status;
          pet.status = newStatus;
          console.log('url', urls['lvl' + pet.level][newStatus]);
          pet.img = urls['lvl' + pet.level][newStatus];
          pet.save().then(function(data) {
            console.log('updated status');
            res.statusCode = 201;
            res.end(JSON.stringify(data.dataValues));
          });
        } else {
          console.log('no pets found!');
        }
      });
  },
  new: function(req, res, next) {
    var name = req.body.name;
    Pet.destroy({ where: { userId: req.session.user.userId} });
    Log.destroy({ where: {} });
    Pet.create({ name: name, userId: req.session.user.userId})
      .then(function(pet) {
        console.log('Created new pet.');
        res.send('success');
      });
  },
  /********** Log Functions **********/
  getLog: function(req, res, next) {
    var petName = req.body.name;
    Log.findAll({})
      .then(function(queries) {
        queries.length > 15 ? queries = queries.slice(queries.length - 15) : null;
        var logs = queries.map(function(query) {
          query.dataValues.createdAt = moment(query.dataValues.createdAt).fromNow();
          return query.dataValues;
        });
        res.statusCode = 200;
        res.json(logs.reverse());
      });
  },
  postLog: function(name, action) {
    Log.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      where: {}
    }).then(function(entry) {
      if (entry.length === 0) {
        Log.create({name: name, action: action})
        .then(function(log) {
          console.log('Created new log.');
        });
      } else if (entry[0].dataValues.action !== 'dead') {
        Log.create({name: name, action: action})
        .then(function(log) {
          console.log('Created new log.');
        });
      }
    });
  },
  /********** User Functions **********/
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var that = this;
    User.findOne({ where: {username: username} })
      .then(function(user) {
        if (user) {
          user = user.dataValues;
          bcrypt.compare(password, user.password, function(err, match) {
            if (err) {
              console.log('error');
              throw err;
            } else if (match) {
              console.log('Login successful');
              that.user = user.userId;
              that.interval = setInterval(poll.bind(that, user.userId), 5000);
              req.session.regenerate(function() {
                req.session.user = user;
                console.log('Saved user.', req.session.user.userId);
                res.send({user: req.session.user});
              });
            } else {
              console.log('Wrong password.');
              res.send({user: req.session.user});
            }
          });
        } else {
          console.log('Username not found.', req.session.user);
          res.send({user: req.session.user});
        }
      });
  },
  logout: function(req, res, next) {
    clearInterval(this.interval);
    this.user = null;
    req.session.destroy(function() {
      res.send('done');
    });
  },
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var that = this;
    User.find({ where: {username: username} })
      .then(function(user) {
        if (!user) {
          bcrypt.genSalt(10, function(err, salt) {
            if (err) {
              throw err;
            } else {
              bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                  throw err;
                } else {
                  User.create({username: username, password: hash}).then(function(user) {
                    console.log('Saved user.');
                    user = user.dataValues;
                    that.user = user.userId;
                    that.interval = setInterval(poll.bind(that, user.userId), 5000);
                    req.session.regenerate(function() {
                      req.session.user = user;
                      console.log('Saved user.', req.session.user.userId);
                      res.send({user: req.session.user});
                    });
                  });
                }
              });
            }
          });
        } else {
          console.log('Account already exists.');
          res.send(false);
        }
      });
  },

  // findpets: function(req, res, next) {
  //   var username = req.body.username;
  //   console.log('username', username);
  //   User.find({ where: {username: username} })
  //     .then(function(user) {
  //       if (!user) {
  //       } else {
  //         console.log('user', user.dataValues.userId);
  //         Pet.find({ where: {userId: user.dataValues.userId} })
  //           .then(function(pet) {
  //             if (!pet) {
  //             } else {
  //               console.log('pet', pet);
  //               res.send({pet: pet, user: user});
  //             }
  //           });
  //       }
  //     });
  // },
  /********** Authentication Middleware **********/
  checkUser: function(req, res, next) {
    if (!req.session.user) {
      console.log('Must login.');
      res.redirect('/login');
    } else {
      next();
    }
  }
};