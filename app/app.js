import createError  from  'http-errors';
import express  from  'express';
import cors  from  'cors';
import logger  from  'morgan';
import  dotenv  from  'dotenv';
dotenv.config()
import indexRouter  from  './routes/index';
import usersRouter  from  './routes/users';
import Brother from './class/Brother';

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const port = 3000
app.use(cors())



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;
