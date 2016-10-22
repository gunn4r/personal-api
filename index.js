//Setup packages
var    express = require('express'),
       bodyParser = require('body-parser');
       port = 9500;

//Init Express
var app = express();

//Setup Middleware and Controllers
var user = require('./user'),
    skills = require('./skills'),
    mainCtrl = require('./controllers/mainCtrl'),
    middleware = require('./controllers/middleware');


//Setup Global Middleware
app.use(middleware.addHeaders);
app.use(bodyParser.json());


//GET Endpoints
app.get('/name', mainCtrl.getName);
app.get('/location', mainCtrl.getLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/occupations/latest', mainCtrl.getOccupationsLatest);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbies/:type', mainCtrl.getHobbies);
app.get('/family', mainCtrl.getFamily);
app.get('/family/:gender', mainCtrl.getFamily);
app.get('/restaurants', mainCtrl.getRestaurants);
app.get('/restaurants/:name', mainCtrl.getRestaurants);
app.get('/skills', mainCtrl.getSkills);
app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.getSecrets);

//PUT Endpoints
app.put('/name/:name', mainCtrl.updateName);
app.put('/location', mainCtrl.updateLocation);

//POST Endpoints
app.post('/hobbies', mainCtrl.addHobby);
app.post('/occupations/:occupation', mainCtrl.addOccupation);
app.post('/family', mainCtrl.addFamily);
app.post('/restaurants', mainCtrl.addRestaurant);
app.post('/skills', middleware.generateId, mainCtrl.addSkill);

//FIRE IN THE HOLE!
app.listen(port, function(){
  console.log('ITS OVER ' + port + '!!!!!!');
});
