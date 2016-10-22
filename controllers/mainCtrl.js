var user = require('../user'),
    skills = require('../skills'),
    secrets = require('../secrets');

module.exports = {

  getName : function(req, res){
    res.status(200).json(user.name);
  },

  getLocation : function(req, res){
    res.status(200).json(user.location);
  },

  getOccupations : function(req, res){
    switch(req.query.order){
      case 'asc':
        res.status(200).json(user.occupations.reverse());
        break;
      case 'desc':
        res.status(200).json(user.occupations.sort());
        break;
      default:
        res.status(200).json(user.occupations);
    }

  },

  getOccupationsLatest : function(req, res){
    res.status(200).json(user.occupations[user.occupations.length]);
  },

  getHobbies : function(req, res){
    if(req.params.type){
      var filtered = user.hobbies.filter(function(item){
        return item.type.toLowerCase() === req.params.type.toLowerCase();
      });
      res.status(200).json({hobbies: filtered});
    }
    res.status(200).json({hobbies: user.hobbies});
  },

  getFamily : function(req, res){

    if(req.params.gender){
      var filtered = user.family.filter(function(item){
        return item.gender.toLowerCase() === req.params.gender.toLowerCase();
      });
      res.status(200).json({family: filtered});
    }

    if(req.query.relation){
      var filtered = user.family.filter(function(item){
        return item.relation.toLowerCase() === req.query.relation.toLowerCase();
      });
      res.status(200).json({family: filtered});
    }

    res.status(200).json({family: user.family});
  },

  getRestaurants : function(req, res){
    if(req.params.name){
      var filtered = user.restaurants.filter(function(item){
        return item.name.toLowerCase() === req.params.name.toLowerCase();
      });
      res.status(200).json({restaurants: filtered});
    }

    if(req.query.rating){
      var filtered = user.restaurants.filter(function(item){
        return item.rating === parseInt(req.query.rating);
      });
      res.status(200).json({restaurants: filtered});
    }

    res.status(200).json({restaurants: user.restaurants});
  },

  getSkills : function(req, res){
    if(req.query.experience){
      var filtered = skills.skills.filter(function(item){
        return item.experience.toLowerCase() === req.query.experience.toLowerCase();
      });
      res.status(200).json({skills: filtered});
    }
    res.status(200).json(skills.skills);
  },
  getSecrets : function(req, res){
    res.status(200).json(secrets);
  },

  //PUT
  updateName : function(req, res){
    user.name = req.params.name;
    res.status(200).json(user.name);
  },
  updateLocation : function(req, res){
    user.location = req.params.location;
    res.status(200).json(user.location);
  },

  //POST
  addHobby : function(req, res){
    user.hobbies.push(req.body);
    res.status(200).json(user.hobbies);
  },
  addOccupation : function(req, res){
    user.occupations.push(req.params.occupation);
    res.status(200).json(user.occupations);
  },
  addFamily : function(req, res){
    user.family.push(req.body);
    res.status(200).json(user.family);
  },
  addRestaurant : function(req, res){
    user.restaurants.push(req.body);
    res.status(200).json(user.restaurants);
  },
  addSkill : function(req, res){
    skills.skills.push(req.body);
    res.status(200).json(skills.skills);
  }
};
