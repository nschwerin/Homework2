const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();

var userRouter = require('../database/routes/user.routes');
var productRouter = require('../database/routes/product.routes');

app.use(BodyParser.json());

app.use('/', userRouter);
app.use('/', productRouter);

(async () => {
  await Mongoose.connect( ENV Variable {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
