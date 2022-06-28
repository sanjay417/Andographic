const mysql = require('mysql');


module.exports = {

    createConnectionPool: ()=>{

        let pool      =    mysql.createPool({
            connectionLimit : 60,
            //host :'migratedandroiddata.cjmdjafniitu.us-west-1.rds.amazonaws.com',
            host :process.env.MYSQL_HOST,
            user     : 'root',
            password : process.env.MYSQL_PASSWORD,
            database : 'AndroidDatabaseFull',   
            debug    :  false,
            multipleStatements: true,
            acquireTimeout: 30000
        });

        return pool;
    },


    createConnection : ()=> {
        return mysql.createConnection({
            //host: 'andrographic.cjpyjmrhqjw4.us-west-1.rds.amazonaws.com',
            host: process.env.MYSQL_HOST,
            user: "root",
            password : process.env.MYSQL_PASSWORD,
            database : 'AndroidDatabaseFull',
            port:3306
        });

       /* var db_config = {
            //host     : 'independentstudy.cl2rqbxdcian.us-west-1.rds.amazonaws.com',
            //host :'migratedandroiddata.cjmdjafniitu.us-west-1.rds.amazonaws.com',
            host :'andrographic.cjpyjmrhqjw4.us-west-1.rds.amazonaws.com',
            user     : 'root',
            password : 'AndPro#123456#',
            //database : 'Android Data'
            database : 'AndroidDatabaseFull'
        };

        var connection;

        function handleDisconnect() {
            connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                            // the old one cannot be reused.

            connection.connect(function(err) {              // The server is either down
                if(err) {                                     // or restarting (takes a while sometimes).
                    console.log('error when connecting to db:', err);
                    setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
                }                                     // to avoid a hot loop, and to allow our node script to
            });                                     // process asynchronous requests in the meantime.
                                                    // If you're also serving http, display a 503 error.
            connection.on('error', function(err) {
                console.log('db error', err);
                if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                    handleDisconnect();                         // lost due to either server restart, or a
                } else {                                      // connnection idle timeout (the wait_timeout
                    throw err;                                 // server variable configures this)
                }
            });

            return connection;
        }

        return handleDisconnect();*/
        /*const connection =  mysql.createConnection({
                //host     : 'independentstudy.cl2rqbxdcian.us-west-1.rds.amazonaws.com',
                host :'migratedandroiddata.cjmdjafniitu.us-west-1.rds.amazonaws.com',
                user     : 'root',
                password : 'AndPro#123456#',
                //database : 'Android Data'
                database : 'AndroidDatabaseFull'
        });

        connection.connect(function (err) {
            if(err){
                console.log("***********************ERROR");
                console.log(err);
                throw err;
            }

        })

        return connection;*/
    }
}
