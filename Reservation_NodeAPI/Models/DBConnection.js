const { Sequelize, DataTypes } = require('sequelize');
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'Config', 'config.json'))[env];


const sequelize = new Sequelize( {
  dialect: 'sqlite', //|'sqlite'|'postgres'|'mssql'
  storage: config.storage 
});

module.exports=sequelize