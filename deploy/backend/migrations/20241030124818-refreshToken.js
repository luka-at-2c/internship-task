"use strict";

const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.context
      ? (queryInterface = queryInterface.context)
      : queryInterface;
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    ); // Use real UUID instead of INTEGER
    await queryInterface.createTable(
      "RefreshToken",
      {
        id: {
          allowNull: false,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
          type: Sequelize.UUID,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "User",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        refreshToken: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        device: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        uniqueKeys: {
          unique_user_device: {
            fields: ["userId", "device"],
          },
        },
      },
    );
  },

  async down(queryInterface) {
    queryInterface.context
      ? (queryInterface = queryInterface.context)
      : queryInterface;
    await queryInterface.dropTable("RefreshToken");
  },
};
