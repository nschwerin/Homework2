const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();

var userRouter = require('../database/routes/user.routes');
var productRouter = require('../database/routes/product.routes');

app.use(BodyParser.json());

app.use('/', userRouter);
app.use('/',productRouter);

(async () => {
  await Mongoose.connect('mongodb+srv://admin:admin@cluster0-cde82.mongodb.net/mongodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
