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
    defaultValue: 'https://lh3.googleusercontent.com/JYDGXArAYUBBLhmne_Ef3Fs6bmGNkI1AGmNK13OUTvwwoIP31bHPuA-K_7p5QL41HMen=w300'
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Campuses;
