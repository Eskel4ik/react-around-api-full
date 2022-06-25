const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const centralErrorHandler = require('./middleware/centralErrorHandler');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(helmet());
app.use(errors());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.get('/users/me', userRouter);
app.get('/users', userRouter);
app.post('/users', userRouter);
app.post('/cards', cardsRouter);
app.delete('/cards/:cardsId', cardsRouter);
app.get('/cards', cardsRouter);
app.get('/users/:id', userRouter);
app.patch('/users/me', userRouter);
app.patch('/users/me/avatar', userRouter);
app.put('/cards/:cardId/likes', cardsRouter);
app.delete('/cards/:cardId/likes', cardsRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
