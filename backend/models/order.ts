'use strict';

import {
  Model,
  UUIDV4
} from 'sequelize';

type OrderAttributes = {
  id: string;
  totalAmount: number;
  productList: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    totalAmount!: number;
    productList!: string;

    static associate(models: any) {
      // define association here
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productList: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};