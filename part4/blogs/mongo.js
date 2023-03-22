const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://admin:${password}@SG-phonebook-57213.servers.mongodirector.com:27017/admin`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
