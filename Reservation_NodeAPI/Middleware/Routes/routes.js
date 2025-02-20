var express = require('express');
var Reservation = require('../../Models/Reservation.model')
const sequelize = require('../../Models/DBConnection');
const reservations = require('../../Models/Reservation.model');
var router = express.Router();

router.get('/GetAllRegistration', function (req, res) {


  Reservation.findAll().then(reservation => {
    res.status(200).json(reservation);
  });
  /* Below query is to manage pagination from serverside ORM 
    page=req.query.page
     let limit = 10;
     let offset = 0 + (page - 1) * limit;
     Reservation.findAndCountAll({
       offset: offset,
       limit: limit,
       order: [["id", "ASC"]],
     })
       .then(async (result) => {
         return res.status(200).json({
             result
         });
       })
       .catch((err) => {
         console.log(err)
       });
       */

});

router.get('/ReservationStats', function (req, res) {
  let from_dt = req.query.fromdt
  let to_dt = req.query.todt
  let resarr = [];
  
  var query = "SELECT count(*) as cnt, strftime('%W',createdAt) as weekdays FROM reservations  WHERE  createdAt between '" + from_dt + "' AND '" + to_dt + "'   group by strftime('%W',createdAt); ";

 
    let dt= sequelize.query(query, null, { raw: true }).then(function (data) {
      if (data)
        res.status(200).send(data)
      else
        res.status(204).json(data)
   }) .catch(err=> console.log( res.status(404).send(err)))
  
  


})

module.exports = router;