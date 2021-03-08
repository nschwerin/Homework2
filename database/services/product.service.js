const Product = require('../models/product')


exports.getProducts = async function (query) {

    try {
        return await Product.find(query).select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};

exports.getProductsSku = async function (query) {

    try {
        return await Product.findOne({sku: query.params.sku}).select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};

exports.postProducts = async function (query) {

    try {
        return await Product.find(query).save();
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};

exports.deleteProducts = async function (query) {

    try {
        return await Product.deleteMany(query);
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};

exports.deleteProductSku = async function (query) {

    try {
        return await User.deleteOne({sku: query.params.sku});
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};

exports.putProducts = async function (query) {
    const { sku } = query.params;
    const product = query.body;
    product.sku = sku;

    try {
        return await Product.findOneAndReplace({ sku }, product, {
            upsert: true,
        });
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};


exports.patchProducts = async function (query) {
    const { sku } = query.params;
    const product = query.body;
    product.sku = sku;

    try {
        return await User.findOneAndUpdate({ sku }, product, {
            new: true,
        })
            .select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error products')
    }
};
