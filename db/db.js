const mongoose = require('mongoose');

// const connectionString = 'mongodb://localhost/gallery';

let connectionString
if(process.env.NODE_ENV == "production") {
  connectionString = process.env.DB_URL
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
