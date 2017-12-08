'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const models = require('../db/models')
const Campuses = models.Campuses;
const Students = models.Students;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

apiRouter.get('/campuses', (req, res, next) => {
	Campuses.findAll({include: Students})
	.then(campuses => res.json(campuses))
	.catch(next);
});

apiRouter.get('/campuses/:campus', (req, res, next) => {
	Campuses.findOne({
		where: {
			id: req.params.campus
		},
		include: Students
	})
	.then(campus => res.json(campus))
	.catch(next);
});

apiRouter.get('/students', (req, res, next) => {
	Students.findAll({
		include: Campuses
	})
	.then(students => res.json(students))
	.catch(next);
});

apiRouter.get('/students/:studentId', (req, res, next) => {
	Students.findOne({
		where: {
			id: req.params.studentId
		},
		include: Campuses
	})
	.then(student => res.json(student))
	.catch(next);
})

apiRouter.post('/campus', (req, res, next) => {
	Campuses.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});

apiRouter.post('/student', (req, res, next) => {
	Students.create(req.body,{include: [Campuses]})
	.then(student => res.status(201).json(student))
	.catch(next);
});

apiRouter.delete('/student/:student', (req, res, next) => {
	let id = parseInt(req.params.student)
	console.log(id)
	Students.destroy({
		where: {
			id: id
		}
	})
	.then(num => {
		console.log(num)
		res.sendStatus(200);
	})
	.catch(next);
});

apiRouter.delete('/campus/:campus', (req, res, next) => {
	let id = parseInt(req.params.campus)

	Campuses.destroy({
		where: {
			id: id
		}
	})
	.then(num => {
		console.log(num)
		res.sendStatus(200);
	})
	.catch(next);
});

// apiRouter.put('/student/:id', (req, res, next) => {
// 	Students.findOne({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	.then(student => student.dataValues)
// 	.then((results) => {

// 	})
// });

// apiRouter.put('/campus', (req, res, next) => {

// });

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;
