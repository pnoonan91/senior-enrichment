'use strict'

const db = require('../index');
const Sequelize = require('sequelize');

var Students = db.define('Students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.DECIMAL(10, 2)
  }
}, {
  getterMethods: {
    name() {
      return this.firstName + " " + this.lastName;
    }
  }
});

Students.beforeCreate(function(student){
  let email = student.firstName.toLowerCase() + '.' + student.lastName.toLowerCase() + '@margarethamiltonacademy.org';

  student.email = email;

});

module.exports = Students;
