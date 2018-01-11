'use strict'
models.export = (sequelize, DataTypes) => {
	var store = sequelize.define('store', {
		storename : DataTypes.STRING,
		addressone : DataType.STRING,
		addresstwo : DataType.STRING,
		state : DataType.STRING,
		city : DataType.STRING,
		zip : DataType.INTEGER

	})
}