const express = require('express');
const cors = require('cors');
import logger  from  'morgan';
import  dotenv  from  'dotenv';
dotenv.config()
import indexRouter  from  './routes/index';
import usersRouter  from  './routes/users';
import teacherRouter  from  './routes/teacher';
import studentRouter  from  './routes/student';



var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/teacher', teacherRouter );
app.use('/student', studentRouter );


const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
module.exports = app;
