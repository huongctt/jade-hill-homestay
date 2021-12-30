const Service = require('../models/service');
const mongoose = require('../../util/mongoose');
const Homestay = require('../models/homestay');
const City = require('../models/city');

class SearchController {
  async getAllCities(req, res, next) {
    City.find()
        .then(cities => {
            console.log(cities);
            res.json(cities)
        })
        .catch(err => console.log(err));
  }

  async search(req, res, next) {
    // const city = await City.findOne({name: req.query.cityid})
    if (req.query.cityid && req.query.homestay) {
      const homestays = await Homestay.find({city: req.query.cityid, name: { '$regex' : req.query.homestay, '$options' : 'i' }})
      res.status(200).send(homestays)
    } else if (req.query.cityid) {
      const homestays = await Homestay.find({city: req.query.cityid})
      res.status(200).send(homestays)
    } else if (req.query.homestay) {
      const homestays = await Homestay.find({name: { '$regex' : req.query.homestay, '$options' : 'i' }})
      res.status(200).send(homestays)
    }
    
  }

  async getOneHomestay (req, res, next) {
    const homestayId = req.params.id;
    const homestay = await Homestay.findById(homestayId);
    const services = await Service.find({ homestay: homestayId });
    res.send({ homestay: homestay, services: services });
  };
}

module.exports = new SearchController();
