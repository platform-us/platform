if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./server');

const port = process.env.PORT || 8080;

app.listen(port);

console.log('Platform server is listening on port ' + port);
