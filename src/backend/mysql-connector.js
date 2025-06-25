//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');
const util    = require('util');

var connection = mysql.createConnection({
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
});


// Promisificar pool.query para usar async/await
connection.query = util.promisify(connection.query);
//=======[ Funciones CRUD ]====================================================
async function getAllDevices() {
    return connection.query('SELECT * FROM Devices');
}

//=======[ Main module code ]==================================================

connection.connect(function(err) {
    if (err) {
        console.error('Error while connect to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId);
});

module.exports = connection;

//=======[ End of file ]=======================================================