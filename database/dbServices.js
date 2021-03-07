var User = require('../models/user')
var Product = require('../models/product')

exports.getUsers = async function (query, page, limit) {

    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.getProducts = async function (query, page, limit) {

    try {
        var products = await Product.find(query)
        return products;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
