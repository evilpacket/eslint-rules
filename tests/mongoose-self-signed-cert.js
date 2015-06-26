var mongoose = require('mongoose');

var dboptions = {
  	db: { native_parser: true },
    server: {
        sslValidate: false
    }
}

mongoose.connect( dbconnect, { server: { sslValidate: true }});
mongoose.connect( dbconnect, { server: { sslValidate: false }});

// false-positive
foo.bar( dbconnect, { server: { sslValidate: false }});