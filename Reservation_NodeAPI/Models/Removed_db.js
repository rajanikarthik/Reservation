const sequelize = require('./DBConnection')
const reservations=require('./Reservation.model')


sequelize.sync().then(() => {

  reservations.findOne().then(res => {
      console.log(res)
  }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
  });

}).catch((error) => {
  console.error('Unable to create table : ', error);
});


