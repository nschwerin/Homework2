const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();

app.use(BodyParser.json());

const productRouter = require('./database/routes/product.routes');
const userRouter = require('./database/routes/user.routes');

app.use('/', userRouter);
app.use('/', productRouter);

(async () => {
  const { url } = process.env;
  await Mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
