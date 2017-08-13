const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
     first: {
       type: Sequelize.STRING
     },
     last: {
      type: Sequelize.STRING
     },
     age: {
      type: Sequelize.INTEGER,
      validate: {
        min: 18
      }
     },
     email: {
      type: Sequelize.STRING,
      allowNull: false
     },
     bio: {
      type: Sequelize.TEXT
     }
}, {
  getterMethods: {
    fullName: function() {
      return this.first + ' ' + this.last;
    }
  }
});

User.prototype.haveBirthday = function() {
  return this.increment('age', {by: 1});
}

// Note other possibilities:

// User.prototype.haveBirthday = function() {
//   this.age++;
//   return this.save();
// }

// User.prototype.haveBirthday = function() {
//   return this.update({age: this.age + 1});
// }

module.exports = User;
