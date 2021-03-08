const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const Service = require('../services/user.service')

const app = Express();

app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
    try {
        await action();
    } catch (e) {
        response.sendStatus(
            e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
                ? 400 : 500,
        );
    }
};

const getUsers =  async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.json(await Service.getUser(request.query).select('-_id -__v'));
    });
};

const getUsersSSN = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        const getResult = await Service.getUserSSN(request);
        if (getResult != null) {
            response.json(getResult);
        } else {
            response.sendStatus(404);
        }
    });
};

const postUsers = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        await new Service.postUser(request.body).save();
        response.sendStatus(201);
    });
};

const deleteUsers = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.sendStatus((await Service.deleteUser(request.query)).deletedCount > 0 ? 200 : 404);
    });
};

const deleteUsersSSN = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.sendStatus((await Service.deleteUserSSN ({
            ssn: request.params.ssn,
        })).deletedCount > 0 ? 200 : 404);
    });
};

const putUsers = async (request, response) => {
    const { ssn } = request.params;
    const user = request.body;
    user.ssn = ssn;
    await doActionThatMightFailValidation(request, response, async () => {
        await Service.putUser({ ssn }, user, {
            upsert: true,
        });
        response.sendStatus(200);
    });
};

const patchUsers = async (request, response) => {
    const { ssn } = request.params;
    const user = request.body;
    delete user.ssn;
    await doActionThatMightFailValidation(request, response, async () => {
        const patchResult = await Service
            .findOneAndUpdate({ ssn }, user, {
                new: true,
            })
            .select('-_id -__v');
        if (patchResult != null) {
            response.json(patchResult);
        } else {
            response.sendStatus(404);
        }
    });
};

module.exports = {
    getUsers,
    getUsersSSN,
    postUsers,
    deleteUsers,
    deleteUsersSSN,
    putUsers,
    patchUsers
};
