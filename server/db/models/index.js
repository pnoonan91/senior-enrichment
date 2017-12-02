'use strict';

const db = require('../index');
const Students = require('./Students');
const Campuses = require('./Campuses');

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// Exporting all models from here seems like a good idea!

// This is also probably a good place for you to set up your associations

Students.belongsTo(Campuses);
Campuses.hasMany(Students);

module.exports = {
	db: db,
	Students: Students,
	Campuses: Campuses
}

// {
// 	db: db,
// 	Students: Students,
// 	Campuses: Campuses
// }
