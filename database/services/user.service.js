var User = require('../models/user')


exports.getUsers = async function (query) {

    try {
        return await User.find(query).select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};

exports.getUsersSSN = async function (query) {

    try {
        return await User.findOne({ssn: query.params.ssn}).select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};

exports.postUsers = async function (query) {

    try {
        return await User.find(query).save();
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};

exports.deleteUsers = async function (query) {

    try {
        return await User.deleteMany(query);
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};

exports.deleteUsersSSN = async function (query) {

    try {
        return await User.deleteOne({ssn: query.params.ssn});
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};

exports.putUsers = async function (query) {
    const { ssn } = query.params;
    const user = query.body;
    user.ssn = ssn;

    try {
        return await User.findOneAndReplace({ ssn }, user, {
            upsert: true,
        });
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};


exports.patchUsers = async function (query) {
    const { ssn } = query.params;
    const user = query.body;
    user.ssn = ssn;

    try {
        return await User.findOneAndUpdate({ ssn }, user, {
            new: true,
        })
            .select('-_id -__v');
    } catch (e) {
        // Log Errors
        throw Error('Error users')
    }
};
