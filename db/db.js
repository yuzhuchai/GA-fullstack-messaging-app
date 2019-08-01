const mongoose = require('mongoose');

// const connectionString = 'mongodb://localhost/gallery';

let connectionString
<<<<<<< HEAD
if(process.env.NODE_ENV == "production") {
  connectionString = process.env.DB_URL
=======
if(process.NODE_ENV == "production") {
  connStr = process.env.DB_URL
>>>>>>> a0357217384c785aee38b375c054d68f4e188683
} else {
  connectionString = 'mongodb://localhost/gallery'
}

mongoose.connect(connectionString, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${connectionString}`);
});


mongoose.connection.on('disconnected', () => {
  console.log(`mongoose disconnected to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose error to ${err}`);
});
