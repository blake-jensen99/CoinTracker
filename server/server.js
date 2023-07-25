const express = require('express');

const cookieParser = require('cookie-parser');

const cors = require('cors') 

const jwt = require('jsonwebtoken')

const app = express();

require('dotenv').config();

const port = process.env.PORT;

require('./config/mongoose.config');

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);
 
app.listen(port, () => console.log(`Listening on port: ${port}`) );
