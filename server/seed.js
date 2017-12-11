// This file should contain all the record creation needed to seed the database with its default campuses and students.
// The data can then be loaded with the node seed.js

var Promise = require('bluebird');
var {
  db,
  Students,
  Campuses
} = require('./db/models');

var data = {
  Campuses: [
    {name: "Mercury", imageUrl: "https://www.thesun.co.uk/wp-content/uploads/2017/04/nintchdbpict000315722781.jpg?strip=all&w=960&quality=100", description: "Mercury is the smallest and innermost planet in the Solar System. Its orbital period around the Sun of 88 days is the shortest of all the planets in the Solar System. It is named after the Roman deity Mercury, the messenger to the gods."},
    {name: "Venus", imageUrl: "https://media.wired.com/photos/592684798d4ebc5ab806a8d1/master/w_2400,c_limit/PlanetVenusTA-680802775.jpg", description: "Venus is the second planet from the Sun, orbiting it every 224.7 Earth days.[12] It has the longest rotation period (243 days) of any planet in the Solar System and rotates in the opposite direction to most other planets."},
    {name: "Earth", imageUrl: "https://img.huffingtonpost.com/asset/58efcf252600003600c45964.jpeg?ops=scalefit_720_noupscale", description: "Earth is the third planet from the Sun and the only object in the Universe known to harbor life. According to radiometric dating and other sources of evidence, Earth formed over 4 billion years ago."},
    {name: "Mars", imageUrl: "https://thenypost.files.wordpress.com/2017/07/mars.jpg?quality=90&strip=all", description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System after Mercury. In English, Mars carries a name of the Roman god of war, and is often referred to as the Red Planet"},
    {name: "Jupiter", imageUrl: "https://brianasaussy.com/wp-content/uploads/2016/08/jupiter-image.jpg", description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a giant planet with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. "},
    {name: "Neptune", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1200px-Neptune_Full.jpg", description: "Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet."}
  ],
  Students: [
    {firstName: "Bob", lastName: "Belcher", gpa: "0", CampusId: "1"},
    {firstName: "Linda", lastName: "Belcher", gpa: "0", CampusId: "1"},
    {firstName: "Tina", lastName: "Belcher", gpa: "0", CampusId: "1"},
    {firstName: "Gene", lastName: "Belcher", gpa: "0", CampusId: "1"},
    {firstName: "Louise", lastName: "Belcher", gpa: "0", CampusId: "1"},
    {firstName: "Peter", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Lois", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Meg", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Chris", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Stewie", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Brian", lastName: "Griffin", gpa: "0", CampusId: "2"},
    {firstName: "Liz", lastName: "Lemon", gpa: "0", CampusId: "3"},
    {firstName: "Tracy", lastName: "Jordan", gpa: "0", CampusId: "3"},
    {firstName: "Kenneth", lastName: "Parcel", gpa: "0", CampusId: "3"},
    {firstName: "Jenna", lastName: "Maroney", gpa: "0", CampusId: "3"},
    {firstName: "Jack", lastName: "Donaghy", gpa: "0", CampusId: "3"},
    {firstName: "Leslie", lastName: "Knope", gpa: "0", CampusId: "4"},
    {firstName: "Ron", lastName: "Swanson", gpa: "0", CampusId: "4"},
    {firstName: "April", lastName: "Ludgate", gpa: "0", CampusId: "4"},
    {firstName: "Andy", lastName: "Dwyer", gpa: "0", CampusId: "4"},
    {firstName: "Tom", lastName: "Haverford", gpa: "0", CampusId: "4"},
    {firstName: "Ann", lastName: "Perkins", gpa: "0", CampusId: "4"},
    {firstName: "Spongebob", lastName: "Squarepants", gpa: "0", CampusId: "5"},
    {firstName: "Patrick", lastName: "Star", gpa: "0", CampusId: "5"},
    {firstName: "Sandy", lastName: "Cheeks", gpa: "0", CampusId: "5"},
    {firstName: "Squidward", lastName: "Tentacles", gpa: "0", CampusId: "5"},
    {firstName: "Larry", lastName: "Lobster", gpa: "0", CampusId: "5"},
    {firstName: "Dee", lastName: "Reynolds", gpa: "0", CampusId: "6"},
    {firstName: "Dennis", lastName: "Reynolds", gpa: "0", CampusId: "6"},
    {firstName: "Frank", lastName: "Reynolds", gpa: "0", CampusId: "6"},
    {firstName: "Charlie", lastName: "Kelly", gpa: "0", CampusId: "6"},
    {firstName: "Ronald", lastName: "MacDonald", gpa: "0", CampusId: "6"}
  ]
};

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log("Finished inserting data (press ctrl-c to exit)");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
});
