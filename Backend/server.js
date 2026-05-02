const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Google's DNS

const app = require('./src/app');
const connectToDb = require('./src/config/database');

connectToDb();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});