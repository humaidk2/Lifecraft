var Pet = require('../data/database.js').Pet;
var postLog = require('./controller').postLog;

/********** Image Assets **********/
var lvl1 = {
  normal: 'normal1',
  runaway: 'runaway1',
  dead: 'dead1',
  sick: 'sick1',
  happy: 'sick1',
};

var lvl2 = {
  normal: 'normal2',
  runaway: 'runaway2',
  dead: 'dead2',
  sick: 'sick2',
  happy: 'sick2',
};

var lvl3 = {
  normal: 'coding3',
  runaway: 'coding3',
  dead: 'dead3',
  sick: 'coding3',
  happy: 'coding3',
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2,
  lvl3: lvl3
};

module.exports = {
  poll: function() {
    Pet.findOne({}).then(function(pet) {
      var name = pet.name;
      var level = pet.level;
      switch (pet.status) {
      case 'coding':
        pet.experience++;
        pet.feed--;
        pet.health--;
        postLog(name, 'coding');
        break;
      case 'eating':
        pet.feed += 2;
        pet.health += 2;
        postLog(name, 'eating');
        break;
      case 'playing':
        pet.health++;
        pet.love++;
        pet.feed--;
        postLog(name, 'playing');
        break;
      case 'sleeping':
        pet.health++;
        pet.experience++;
        pet.feed--;
        postLog(name, 'sleeping');
        break;
      default:
        if (pet.feed > 0) {
          pet.feed--;
        }
        if (pet.health > 0) {
          pet.health--;
        }
        if (pet.love > 0) {
          pet.love--;
        }
        break;
      }
      //if dead, run only this
      if (pet.health <= 0 || pet.feed <= 0) {
        pet.status = 'dead';
        pet.phys = 'dead';
        pet.mood = 'dead';
        pet.img = urls['lvl' + level]['dead'];
        postLog(name, 'dead');
        return pet.save();
      }
      //check level before anything else
      if (pet.experience > 5) {
        pet.level = pet.level + 1;
        pet.experience = 0;
        postLog(name, 'leveled up');
      }
      //then update values
      if (pet.health < 3) {
        pet.status = 'sick';
        pet.phys = 'sick';
        pet.mood = 'sad';
        pet.img = urls['lvl' + level]['sick'];
        postLog(name, 'sick');
        return pet.save();
      } else if (pet.feed < 3) {
        pet.status = 'normal';
        pet.phys = 'hungry';
        pet.mood = 'grumpy';
        postLog(name, 'hungry');
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      } else if (pet.health > 8) {
        pet.status = 'normal';
        pet.phys = 'healthy';
        pet.mood = 'feeling awesome';
        postLog(name, 'healthy');
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      } else if (pet.feed > 8) {
        pet.status = 'sick';
        pet.phys = 'obese';
        pet.mood = 'bloated';
        postLog(name, 'obese');
        pet.img = urls['lvl' + level]['sick'];
        return pet.save();
      } else if (pet.love > 8) {
        pet.status = 'happy';
        pet.phys = 'great';
        pet.mood = 'feeling loved';
        postLog(name, 'happy');
        pet.img = urls['lvl' + level]['happy'];
        return pet.save();
      } else if (pet.love < 2) {
        pet.status = 'runaway';
        pet.phys = 'unknown';
        pet.mood = 'unknown';
        postLog(name, 'runaway');
        pet.img = urls['lvl' + level]['runaway'];
        return pet.save();
      } else {
        pet.status = 'normal';
        pet.mood = 'normal';
        pet.phys = 'normal';
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      }
    });
  }
};