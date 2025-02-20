const DataTypes = require('sequelize');
const sequelize = require('./DBConnection')
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'Config', 'config.json'))[env];

ReserveStatus = Object.freeze({
  Confirmed: 'confirmed',
  Cancelled: 'canceled',
  noShow: 'noShow',
  Arrived: 'arrived',
  Placed: 'placed',
  Pending: 'pending',
  finished: 'finished',
  Waiting: 'waiting',
  Blocked: 'blocked'

});
ReservationSource = Object.freeze({
  Online: 'online',
  Manual: 'manual',
  App: 'app',
  walkin: 'walkin'
})

const reservations = sequelize.define('reservations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  betriebId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.TEXT,
    values: this.ReserveStatus
  },
  gastId: {
    type: DataTypes.INTEGER,
  },
  peopleCount: {
    type: DataTypes.SMALLINT
  },
  msg: {
    type: DataTypes.TEXT
  },
  notes: {
    type: DataTypes.TEXT
  },
  tags: {
    type: DataTypes.TEXT
  },
  reservedFor: {
    type: DataTypes.TEXT
  },
  shiftId: {
    type: DataTypes.INTEGER
  },
  roomId: {
    type: DataTypes.INTEGER
  },
  stayTime: {
    type: DataTypes.SMALLINT
  },
  userPerSmsInform: {
    type: DataTypes.TEXT
  },
  isTablePlan: {
    type: DataTypes.TEXT
  },
  feedbackHash: {
    type: DataTypes.TEXT
  },
  feedbackSent: {
    type: DataTypes.TEXT
  },
  addOns: {
    type: DataTypes.TEXT
  },
  orderId: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE
  },
  hash: {
    type: DataTypes.TEXT
  },
  locked: {
    type: DataTypes.INTEGER
  },
  paymentTemplate: {
    type: DataTypes.INTEGER
  },
  paymentId: {
    type: DataTypes.INTEGER
  },
  invoice: {
    type: DataTypes.REAL
  },
  recurrenceId: {
    type: DataTypes.INTEGER
  },
  source: {
    type: DataTypes.TEXT,
    values: this.ReservationSource
  },
  turnover: {
    type: DataTypes.REAL
  },
  children: {
    type: DataTypes.INTEGER
  },
  highChairs: {
    type: DataTypes.INTEGER
  },
  resHotelID: {
    type: DataTypes.INTEGER
  },
  referrer: {
    type: DataTypes.TEXT
  }
});


module.exports = reservations


