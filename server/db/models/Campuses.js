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
    defaultValue: 'https://www.ljmu.ac.uk/~/media/ljmu/news/starsedit.jpg'
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
