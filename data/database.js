var Sequelize = require('sequelize');

// NOTE: create 'hrgotchi' database before running
var db = new Sequelize('hrgotchi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

//user schema
var User = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
}, {timestamps: false});

//pet schema
var Pet = db.define('Pets', {
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  status: {type: Sequelize.STRING, defaultValue: 'normal'},
  feed: {type: Sequelize.INTEGER, defaultValue: 8},
  health: {type: Sequelize.INTEGER, defaultValue: 8},
  love: {type: Sequelize.INTEGER, defaultValue: 8},
  experience: {type: Sequelize.INTEGER, defaultValue: 0},
  level: {type: Sequelize.INTEGER, defaultValue: 1},
  mood: {type: Sequelize.STRING, defaultValue: 'normal'},
  phys: {type: Sequelize.STRING, defaultValue: 'normal'},
  img: {type: Sequelize.STRING, defaultValue: 'http://quotesideas.com/wp-content/uploads/2015/07/Gif-minions-latest-images-2015.gif'},
}, {timestamps: false});

//log schema
var Log = db.define('Logs', {
  name: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Pet'},
  action: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Hey'},
  createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
});

//creates any missing tables
//pass in {force: true} to clear tables
User.sync();
Pet.sync();
Log.sync();

module.exports = {
  User: User,
  Pet: Pet,
  Log: Log,
  db: db
}