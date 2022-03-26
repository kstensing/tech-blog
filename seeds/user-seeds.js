const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: "user1@gmail.com",
    password: "user1234"
  },
  {
    username: "user2@gmail.com",
    password: "user2345"
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
