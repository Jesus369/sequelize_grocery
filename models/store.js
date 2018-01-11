'use strict';
module.exports = (sequelize, DataTypes) => {
  var store = sequelize.define('store', {
    storename: DataTypes.STRING,
    addressone: DataTypes.STRING,
    addresstwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return store;
};