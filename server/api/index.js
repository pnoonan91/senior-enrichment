'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const models = require('../db/models')
const Campuses = models.Campuses;
const Students = models.Students;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

//Get route returns all campuses
apiRouter.get('/campuses', (req, res, next) => {
	Campuses.findAll({include: Students})
	.then(campuses => res.json(campuses))
	.catch(next);
});


//Get route returns a specific campus (by campus ID)
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

//Get route returns all students
apiRouter.get('/students', (req, res, next) => {
	Students.findAll({
		include: Campuses
	})
	.then(students => res.json(students))
	.catch(next);
});

//Get route returns a specific student (by student ID)
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


//Post route creates a new campus
apiRouter.post('/campus', (req, res, next) => {
	Campuses.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});

//Post route creates a new student
apiRouter.post('/student', (req, res, next) => {
	Students.create(req.body,{include: [Campuses]})
	.then(student => res.status(201).json(student))
	.catch(next);
});


//Delete route removes a specific student (by student ID)
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


//Delete route removes a specific campus (by campus ID). Deletes all students associated to the campus
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

//Put route updates a specific student's information
apiRouter.put('/student/:student', (req, res, next) => {
	let id = parseInt(req.params.student)

	Students.findOne({
		where: {
			id: id
		}
	})
		.then(student => student.update(req.body))
		.then(Students.findOne({
			where: {
				id: id
			},
			include: Campuses
		}))
		.then(result => {
			res.status(200).json(result)
		})
		.catch(next);
});

//Put route updates a specific campus' information
apiRouter.put('/campus/:campus', (req, res, next) => {
	let id = parseInt(req.params.campus)

	Campuses.findOne({
		where: {
			id: id
		}
	})
		.then(campus => campus.update(req.body))
		.then(result => res.status(200).json(result))
		.catch(next);

})

module.exports = apiRouter;
