const config = require('config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const auth = require('./routes/auth');
const express = require('express');
const app = express();
const {User} = require('./models/user');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const db = mongoose.connection;
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) return;
  let salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash("admin", salt);
  Promise.all([
    User.create({name: "admin",email : "admin@admin.com", password : password, role : {isAdmin : true}}),
  ]).then(() => console.log("Added Admin User"));
});
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/auth', auth);
app.use('*', function(req, res){
  res.status(404).json({error: "Please check the URL.The endpoint doesn't exist"});
});

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
