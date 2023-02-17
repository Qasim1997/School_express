"use strict";

require('dotenv').config();
const {
  env
} = process;
module.exports = {
  development: {
    username: "postgres",
    password: "12345678",
    database: "school_management",
    host: "localhost",
    dialect: 'postgres'
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'postgres'
  }
};