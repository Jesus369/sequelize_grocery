'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    cost: DataTypes.INTEGER
  }, {});

product.associate = (models) => {
  product.belongsTo(models.store,{as : 'store', foreignKey : 'storeid'})
}

  return product;
};
