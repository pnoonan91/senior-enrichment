'use strict';

const db = require('../index');
const Students = require('./Students');
const Campuses = require('./Campuses');

//Model associations -- When one campus is deleted all associated students will be deleted
Students.belongsTo(Campuses, { onDelete: 'cascade' });
Campuses.hasMany(Students);

module.exports = {
	db: db,
	Students: Students,
	Campuses: Campuses
};
