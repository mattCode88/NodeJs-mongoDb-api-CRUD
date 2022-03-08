const express = require('express');
const route = express.Router();
const services = require('../services/render');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/show-users', services.showUsers);

/**
 * @description Root Route
 * @method GET /
 */
route.get('/show-user', services.showUser);

/**
 * @description Add User Route
 * @method GET /add-user
 */
route.get('/add-user', services.addUser);

/**
 * @description Update User Route
 * @method GET /update-user
 */
route.get('/update-user', services.updateUser);

module.exports = route;