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
    defaultValue: 'https://imgur.com/tByP9wz'
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Campuses;
