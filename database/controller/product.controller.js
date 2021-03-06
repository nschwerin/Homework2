const Express = require('express');
const BodyParser = require('body-parser');

const UserController = require('../services/product.service');

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

const getProducts = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.json(await Product.find(request.query).select('-_id -__v'));
    });
};

const getProductsSku = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        const getResult = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
        if (getResult != null) {
            response.json(getResult);
        } else {
            response.sendStatus(404);
        }
    });
};

const postProducts = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        await new Product(request.body).save();
        response.sendStatus(201);
    });
};

const deleteProducts = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.sendStatus((await Product.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
    });
};

const deleteProductsSku = async (request, response) => {
    await doActionThatMightFailValidation(request, response, async () => {
        response.sendStatus((await Product.deleteOne({
            sku: request.params.sku,
        })).deletedCount > 0 ? 200 : 404);
    });
};

const putProducts = async (request, response) => {
    const { sku } = request.params;
    const product = request.body;
    product.sku = sku;
    await doActionThatMightFailValidation(request, response, async () => {
        await Product.findOneAndReplace({ sku }, product, {
            upsert: true,
        });
        response.sendStatus(200);
    });
};

const patchProducts = async (request, response) => {
    const { sku } = request.params;
    const product = request.body;
    delete product.sku;
    await doActionThatMightFailValidation(request, response, async () => {
        const patchResult = await Product
            .findOneAndUpdate({ sku }, product, {
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
    getProducts,
    getProductsSku,
    postProducts,
    deleteProducts,
    deleteProductsSku,
    putProducts,
    patchProducts
};
