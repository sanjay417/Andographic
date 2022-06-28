const ConnectionController = require('./ConnectionController');
const UtilityController = require('./UtilityController');

module.exports = {
    getColumnsNames : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?;',['Android Data','contextual'],(err,results)=>{
                console.log(results);
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getColumnData : (column)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            console.log(column);
            connection.query('SELECT '+column+', Title  from contextual',(err,results)=>{
                console.log(results);
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getDeveloperAndAppCount : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            /*let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }*/

            let sqlFilter = UtilityController.getSQLV2(type, vtdetections)
            let sql = 'select distinct count(*) as cnt, DeveloperName from technical '+ sqlFilter +' group by DeveloperName';
            connection.query(sql ,(err,results)=>{
                console.log(sql);
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getDeveloperData: (number) => {
        return  new Promise(function(resolve,reject){
            const connection = ConnectionController.createConnection();
            connection.query(`SELECT * FROM contextual LIMIT ${number}`,(err,results)=>{
                // console.log(results);
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },

    getDevConsoleContentRating : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT ContentRating, COUNT(DISTINCT pkgname) AS `total` FROM contextual WHERE DeveloperName='" + devloper + "' GROUP BY ContentRating",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getDevConsoleGenre : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT Genre, COUNT(DISTINCT pkgname) AS `total` FROM contextual WHERE DeveloperName='" + devloper + "' GROUP BY Genre",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getDeveloperApps : (developer) => {
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT title FROM contextual WHERE DeveloperName=" + developer ,(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }
                else {
                    resolve(results)
                }
             })
        })
    },   
}