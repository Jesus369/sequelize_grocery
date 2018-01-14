'use strict';
module.exports = (sequelize, DataTypes) => {
  var store = sequelize.define('store', {
    storename: DataTypes.STRING,
    addressone: DataTypes.STRING,
    addresstwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {});

  store.associate = (models) => {
    store.hasMany(models.product, {
      as : 'product',
      foreignKey : 'storeid'
    })
  }

  return store;
};
