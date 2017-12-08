'use strict'

const db = require('../index');
const Sequelize = require('sequelize');

var Campuses = db.define('Campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://media.salon.com/2017/11/planet-nine-620x412.jpg'
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  getterMethods: {
    shortDescription(){
      return this.description.slice(0,170).concat('...');
    }
  }
});

module.exports = Campuses;
