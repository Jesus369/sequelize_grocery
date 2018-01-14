'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn (
      'products',
      'storeid',
      {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'stores',
          key : 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'products',
      'postid'
    )
  }
};
