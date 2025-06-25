var mysql = require('mysql');
const util    = require('util');

var connection = mysql.createConnection({
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
});



connection.query = util.promisify(connection.query);

async function getAllDevices() {
    return connection.query('SELECT * FROM Devices');
}



connection.connect(function(err) {
    if (err) {
        console.error('Error while connect to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId);
});

module.exports = connection;
