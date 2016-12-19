var db = require('../data/database.js');
var Pet = db.Pet;
var User = db.User;
var Log = db.Log;
var bcrypt = require('bcryptjs');
var moment = require('moment');

/********** Image Assets **********/
var lvl1 = {
  coding: "coding1",
  sleeping: "sleeping1",
  playing: "playing1",
  eating: "eating1"
};

var lvl2 = {
  coding: "coding2",
  sleeping: "sleeping2",
  playing: "playing2",
  eating: "eating2"
};

var lvl3 = {
  coding: "coding3",
  sleeping: "coding3",
  playing: "coding3",
  eating: "coding3"
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2,
  lvl3: lvl3
};

module.exports = {
  /********** Pet Functions **********/
  get: function(req, res, next) {
    Pet.findOne({})
      .then(function(query) {
        var pet = query.dataValues;
        res.statusCode = 200;
        res.json(pet);
      })
  },
  post: function(req, res, next) {
    Pet.findOne({})
      .then(function(pet) {
        if (pet) {
          var newStatus = req.body.status;
          pet.status = newStatus;
          console.log('url', urls['lvl'+ pet.level][newStatus]);
          pet.img = urls['lvl'+ pet.level][newStatus];
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
    Pet.destroy({ where: {} });
    Log.destroy({ where: {} });
    Pet.create({ name: name })
      .then(function(pet) {
        console.log('Created new pet.');
        res.send("success");
      });
  },
  /********** Log Functions **********/
  getLog: function(req, res, next) {
    var petName = req.body.name;
    Log.findAll({})
      .then(function(queries) {
        queries.length > 15 ? queries=queries.slice(queries.length - 15): null;
        var logs = queries.map(function(query) {
          query.dataValues.createdAt = moment(query.dataValues.createdAt).fromNow();
          return query.dataValues
        })
        res.statusCode = 200;
        res.json(logs.reverse());
      })
  },
  postLog: function(name, action) {
    Log.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      where: {}
    }).then(function(entry){
      if(entry.length === 0){
        Log.create({name: name, action: action})
        .then(function(log) {
          console.log('Created new log.');
        });
      } else if(entry[0].dataValues.action !== 'dead'){
        Log.create({name: name, action: action})
        .then(function(log) {
          console.log('Created new log.');
        });
      }
    })
  },
  /********** User Functions **********/
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ where: {username: username} })
      .then(function(user){
        if (user) {
          user = user.dataValues;
          bcrypt.compare(password, user.password, function(err, match) {
            if (err) {
              console.log('error')
              throw err;
            } else if (match) {
              console.log('Login successful');
              req.session.regenerate(function() {
                req.session.user = user.username;
                res.send({user: req.session.user});
              });
            } else {
              console.log('Wrong password.');
              res.send({user: req.session.user});
            }
          })
        } else {
          console.log('Username not found.');
          res.send({user: req.session.user});
        }
      })
  },
  logout: function(req, res, next) {
    req.session.destroy(function() {
      res.redirect('/login');
    });
  },
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
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
                    req.session.regenerate(function() {
                      req.session.user = user.username;
                      res.send({user: req.session.user});
                    });
                  });
                }
              })
            }
          })
        } else {
          console.log('Account already exists.');
          res.send(false);
        }
      });
  },
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