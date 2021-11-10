const ConnectionController = require('./ConnectionController');
const UtilityController = require('./UtilityController');

module.exports = {
    getPermissionCountByDeveloper : (devlopers, vtdetections)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }
            console.log(devlopers);
            /* connection.query('SELECT DeveloperName, avg(ID1+ID2+ID3+ID4+ID5+ID6+ID7+ID8+ID9+ID10+ID11+ID12+ID13+ID14+ID15+ID16+ID17+ID18+ID19+ID20+ID21+ID22+ID23+ID24+ID25+ID26+ID27+ID28+ID29+ID30+ID31+ID32+ID33+ID34+ID35+ID36+ID37+ID38+ID39+ID40+ID41+ID42+ID43+ID44+ID45+ID46+ID47+ID48+ID49+ID50+ID51+ID52+ID53+ID54+ID55+ID56+ID57+ID58+ID59+ID60+ID61+ID62+ID63+ID64+ID65+ID66+ID67+ID68+ID69+ID70+ID71+ID72+ID73+ID74+ID75+ID76+ID77+ID78+ID79+ID80+ID81+ID82+ID83+ID84+ID85+ID86+ID87+ID88+ID89+ID90+ID91+ID92+ID93+ID94+ID95+ID96+ID97+ID98+ID99+ID100+ID101+ID102+ID103+ID104+ID105+ID106+ID107+ID108+ID109+ID110+ID111+ID112+ID113+ID114+ID115+ID116+ID117+ID118+ID119+ID120+ID121+ID122+ID123+ID124+ID125+ID126+ID127+ID128+ID129+ID130+ID131+ID132+ID133+ID134+ID135+ID136+ID137+ID138) AS total'+
                 ' FROM technical group by DeveloperName having DeveloperName IN ('+devlopers +") order by DeveloperName ASC",(err,results)=>{*/
            connection.query('SELECT DeveloperName, avg(count) as total FROM permissionview where DeveloperName IN ('+devlopers +") "+sqlFilter+"group by DeveloperName order by DeveloperName ASC",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    console.log(results);
                    resolve(results)
                }
            })
        })
    },

    getPermissionCountByDevApp : (devlopers, vtdetections)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            const connection = ConnectionController.createConnection();
            let sql = 'SELECT DeveloperName,title, sum(count)  AS total FROM permissionview where DeveloperName IN ('+devlopers +') '+sqlFilter+"group by DeveloperName order by DeveloperName ASC";
            /*  connection.query('SELECT DeveloperName,title, sum(ID1+ID2+ID3+ID4+ID5+ID6+ID7+ID8+ID9+ID10+ID11+ID12+ID13+ID14+ID15+ID16+ID17+ID18+ID19+ID20+ID21+ID22+ID23+ID24+ID25+ID26+ID27+ID28+ID29+ID30+ID31+ID32+ID33+ID34+ID35+ID36+ID37+ID38+ID39+ID40+ID41+ID42+ID43+ID44+ID45+ID46+ID47+ID48+ID49+ID50+ID51+ID52+ID53+ID54+ID55+ID56+ID57+ID58+ID59+ID60+ID61+ID62+ID63+ID64+ID65+ID66+ID67+ID68+ID69+ID70+ID71+ID72+ID73+ID74+ID75+ID76+ID77+ID78+ID79+ID80+ID81+ID82+ID83+ID84+ID85+ID86+ID87+ID88+ID89+ID90+ID91+ID92+ID93+ID94+ID95+ID96+ID97+ID98+ID99+ID100+ID101+ID102+ID103+ID104+ID105+ID106+ID107+ID108+ID109+ID110+ID111+ID112+ID113+ID114+ID115+ID116+ID117+ID118+ID119+ID120+ID121+ID122+ID123+ID124+ID125+ID126+ID127+ID128+ID129+ID130+ID131+ID132+ID133+ID134+ID135+ID136+ID137+ID138) AS total'+
                  ' FROM technical group by DeveloperName having DeveloperName IN ('+devlopers +") order by DeveloperName ASC",(err,results)=>{*/
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

    getDangerousPermissionCountByDev : (devlopers, vtdetections)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            //TODO ID 101
            let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            connection.query('SELECT DeveloperName,title, sum(ID85 + ID130 +ID45 + ID87 + ID132 + ID63 + ID3 + ID2 + ID102 + ID92 + ID43 + ID86 + ID131 + ID9 + ID126 + ID84 + ID38+ ID108+ ID100 + ID93 + ID99 + ID88 + ID133 + ID101 ) AS total'+
                ' FROM technical where DeveloperName IN ('+devlopers +") "+sqlFilter+" group by DeveloperName order by DeveloperName ASC",(err,results)=>{

                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getPermissionsByCategoryContacts : (devlopers)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            //TODO ID 101
            connection.query('SELECT DeveloperName,title,sum(ID87 + ID132 + ID63) as contacts'+
                ' FROM technical group by DeveloperName having DeveloperName IN ('+devlopers +") order by DeveloperName ASC",(err,results)=>{

                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },


    getGenre : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('select distinct Genre from technical', (err, results) => {

                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getGenreCount : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            console.log(genres);

            //let sqlFilter  = 'and vtdetection IN ('+vtdetections +')';
            //if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
            let sqlFilter = UtilityController.getSQLV1(type, vtdetections)

            let sql = 'select genre, count(*) as total from technical where Genre IN ('+genres +') '+sqlFilter+' group by Genre';
            console.log(sql);
            connection.query(sql ,(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    /**
     * Return list of application name
     */

    getApplications : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('select title from technical;',(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getApplicationsWithFilter : (filter)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("select title from technical where title like '%"+filter+"%';",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    /**
     * Populate application count by application name
     * @param applications
     * @returns {Promise<any>}
     */

    getPermissionCountByApplication : (applications)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            /* connection.query('SELECT title, sum(ID1+ID2+ID3+ID4+ID5+ID6+ID7+ID8+ID9+ID10+ID11+ID12+ID13+ID14+ID15+ID16+ID17+ID18+ID19+ID20+ID21+ID22+ID23+ID24+ID25+ID26+ID27+ID28+ID29+ID30+ID31+ID32+ID33+ID34+ID35+ID36+ID37+ID38+ID39+ID40+ID41+ID42+ID43+ID44+ID45+ID46+ID47+ID48+ID49+ID50+ID51+ID52+ID53+ID54+ID55+ID56+ID57+ID58+ID59+ID60+ID61+ID62+ID63+ID64+ID65+ID66+ID67+ID68+ID69+ID70+ID71+ID72+ID73+ID74+ID75+ID76+ID77+ID78+ID79+ID80+ID81+ID82+ID83+ID84+ID85+ID86+ID87+ID88+ID89+ID90+ID91+ID92+ID93+ID94+ID95+ID96+ID97+ID98+ID99+ID100+ID101+ID102+ID103+ID104+ID105+ID106+ID107+ID108+ID109+ID110+ID111+ID112+ID113+ID114+ID115+ID116+ID117+ID118+ID119+ID120+ID121+ID122+ID123+ID124+ID125+ID126+ID127+ID128+ID129+ID130+ID131+ID132+ID133+ID134+ID135+ID136+ID137+ID138) AS permissionTotal'+
                 ' FROM technical group by title having title IN ('+applications +")",(err,results)=>{*/
            connection.query('SELECT title, sum(count) as permissionTotal FROM permissionview where title IN ('+applications +") group by title",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getSystemActionsCountByApplications : (applications)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let query =
                /* connection.query('SELECT title, sum(ID139+ID140+ID141+ID142+ID143+ID144+ID145+ID146+ID147+ID148+ID149+ID150+ID151+ID152+ID153+ID154+ID155+ID156+' +
                     'ID157+ID158+ID159+ID160+ID161+ID162+ID163+ID164+ID165+ID166+ID167+ID168+ID169+ID170+ID171+ID172+ID173+ID174+ID175+ID176+ID177+ID178+ID179+ID180+I' +
                     'D181+ID182+ID183+ID184+ID185+ID186+ID18+ID188+ID189+ID190+ID191+ID192+ID193+ID194+ID195+ID19+ID197+ID198+ID199+ID200+ID201+ID202+ID203+ID204+ID205+' +
                     'ID206+ID207+ID208+ID209+ID210+ID211+ID212+ID213+ID214+ID215+ID216+ID21+ID218+ID219+ID220+ID221+ID222+ID223+ID224+ID225+ID226+ID227+ID228+ID229+ID230' +
                     '+ID231+ID232+ID233+ID235+ID238+ID239+ID240+ID241+ID242+ID243+ID24+ID245+ID246+ID247+ID248+ID249+ID250+ID251+ID252+ID253+ID254+ID255+ID256+ID257+ID258' +
                     '+ID259+ID260+ID261+ID262+ID263+ID264+ID265+ID266+ID267+ID268+ID269+ID270+ID271+ID272+ID273+ID274+ID275+ID276+ID277+ID278+ID279+ID280+ID281+ID282+ID283' +
                     '+ID284+ID285+ID286+ID287+ID288+ID289+ID290+ID291+ID292+ID293+ID294+ID295+ID296+ID297+ID298+ID299+ID300+ID301+ID302+ID303+ID304+ID305+ID306+ID30+ID308' +
                     '+ID309+ID310+ID311+ID312) AS actionTotal'+
                     ' FROM technical group by title having title IN ('+applications +")",(err,results)=>{*/
                connection.query('SELECT title, sum(count) AS actionTotal'+
                    ' FROM systemactionview where title IN ('+applications +") group by title ",(err,results)=>{
                    connection.end();
                    if(err){
                        reject(err)
                    }else {
                        resolve(results)
                    }
                })
        })
    },


    getPermissions : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("select pid, permission from permission where type = 'permission'", (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionUsageCount : (permissionIds, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            var i;
            let finalResult = [];
      /*      let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }*/

            let sqlFilter = UtilityController.getSQLV2(type, vtdetections)
            for(i = 0; i < permissionIds.length; i++){
                const connection = ConnectionController.createConnection();
                let value = permissionIds[i]
                connection.query('SELECT sum(' + permissionIds[i] + ') as total FROM technical' + sqlFilter, (err, results) => {
                    connection.end();
                    if (err) {
                        reject(err)
                    } else {
                        finalResult.push({total : results[0].total, "pid": value});

                        if(finalResult.length == permissionIds.length){
                            resolve(finalResult);
                        }
                    }

                });
            }
        });
    },

    getPermissionsByCalender : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let finalResult = [];
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID313) as Calendar from technical' + sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByContacts : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let finalResult = [];
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID315) as Contacts  from technical' + sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByCamera : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID314) as Camera from technical' + sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByLocation : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);

            connection.query('select sum(ID316) as Location from technical '+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByMicrophone : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID317) as Microphone from technical'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByPhone : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID318) as Phone from technical '+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsBySensor : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID319) as Sensor from technical'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsBySms : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID320) as SMS from technical'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByStorage : (vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum(ID321) as Storage from technical'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    /**
     * System Action queries
     */

    getSystemActions : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("select pid, permission from permission where type = 'action'", (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    //get total count of permission in each group for a Developer across all apps
    getDevConsolePermissions : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT SUM(ID130+ID85) AS `CALENDAR`, SUM(ID45) AS `CAMERA`, SUM(ID132+ID63+ID87) AS `CONTACTS`, SUM(ID2+ID3) AS `LOCATION`, SUM(ID102) AS `MICROPHONE`, SUM(ID126+ID131+ID43+ID84+ID86+ID9+ID92) AS `PHONE`, SUM(ID38) AS `SENSORS`, SUM(ID100+ID101+ID108+ID93+ID99) AS `SMS`, SUM(ID133+ID88) AS `STORAGE` FROM technical WHERE DeveloperName='" + devloper + "' GROUP BY DeveloperName",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    //get total count of 1 star to 5 star ratings for a developer across each apps
    getDevConsoleRatings : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT SUM(OneStarRatings) AS `1 star`, SUM(TwoStarRatings) AS `2 star`,SUM(ThreeStarRatings) AS `3 star`, SUM(FourStarRatings) AS `4 star`, SUM(FiveStarRatings) AS `5 star` FROM contextual WHERE DeveloperName='" + devloper + "' GROUP BY DeveloperName",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },


    getDevConsoleAndroidVersion : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query("SELECT AndroidVersion, COUNT(DISTINCT pkgname) as `total` FROM contextual WHERE DeveloperName='" + devloper + "' GROUP BY AndroidVersion",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    /**Genre PermissionAll**/


    getGenrePermissionUsageCount : (permissionIds, genres)=>{
        return new Promise(function(resolve, reject) {
            var i;
            let finalResult = [];
            for(i = 0; i < permissionIds.length; i++){
                const connection = ConnectionController.createConnection();
                let value = permissionIds[i]
                connection.query('SELECT sum(' + permissionIds[i] + ') as total FROM technical where Genre IN('+genres +')', (err, results) => {
                    connection.end();
                    if (err) {
                        reject(err)
                    } else {
                        finalResult.push({total : results[0].total, "pid": value});

                        if(finalResult.length == permissionIds.length){
                            resolve(finalResult);
                        }
                    }
                });
            }
        });
    },


    getGenrePermissionUsageCountV2 : (permissionIds, genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            var i;
            let finalResult = [];
/*
            let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections.length == 0){
                sqlFilter = " ";
            }*/
            let sqlFilter = UtilityController.getSQLV1(type, vtdetections)

            for(i = 0; i < permissionIds.length; i++){
                for(let j = 0; j < genres.length; j++){
                    const connection = ConnectionController.createConnection();
                    let value = permissionIds[i];
                    let genre = genres[j];
                    let sql = 'SELECT sum(' + permissionIds[i] + ') as total  FROM technical where Genre = "'+genre +'"' + sqlFilter;
                    connection.query(sql , (err, results) => {
                        console.log(sql);
                        connection.end();
                        if (err) {
                            reject(err)
                        } else {


                            finalResult.push({total : results[0].total, "pid": value, "Genre": genre});

                            if(finalResult.length == (permissionIds.length * genres.length)){
                                console.log(finalResult);
                                resolve(finalResult);
                            }
                        }
                    });
                }

            }
        });
    },


    /********PermissionAll Category By Genre********/
    getPermissionsByGenreCalendar : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let finalResult = [];
       /*     let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }*/
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let sql = 'select sum(ID313) as Calendar from technical where Genre IN('+genres +')' + sqlFilter;
            let connection = ConnectionController.createConnection();
            connection.query(sql , (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreContacts : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();

            connection.query('select sum(ID315) as Contacts from technical where Genre IN('+genres +')' + sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreCamera : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID314) as Camera from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreLocation : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID316) as Location from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreMicrophone : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID317) as Microphone from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenrePhone : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID318) as Phone from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreSensor : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID319) as Sensor from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreSms : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID320) as SMS from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByGenreStorage : (genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID321) as Storage from technical where Genre IN('+genres +')'+ sqlFilter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionUsageByDeveloper : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            /* connection.query('SELECT DeveloperName,Title, avg(ID1+ID2+ID3+ID4+ID5+ID6+ID7+ID8+ID9+ID10+ID11+ID12+ID13+ID14+ID15+ID16+ID17+ID18+ID19+ID20+ID21+ID22+ID23+ID24+ID25+ID26+ID27+ID28+ID29+ID30+ID31+ID32+ID33+ID34+ID35+ID36+ID37+ID38+ID39+ID40+ID41+ID42+ID43+ID44+ID45+ID46+ID47+ID48+ID49+ID50+ID51+ID52+ID53+ID54+ID55+ID56+ID57+ID58+ID59+ID60+ID61+ID62+ID63+ID64+ID65+ID66+ID67+ID68+ID69+ID70+ID71+ID72+ID73+ID74+ID75+ID76+ID77+ID78+ID79+ID80+ID81+ID82+ID83+ID84+ID85+ID86+ID87+ID88+ID89+ID90+ID91+ID92+ID93+ID94+ID95+ID96+ID97+ID98+ID99+ID100+ID101+ID102+ID103+ID104+ID105+ID106+ID107+ID108+ID109+ID110+ID111+ID112+ID113+ID114+ID115+ID116+ID117+ID118+ID119+ID120+ID121+ID122+ID123+ID124+ID125+ID126+ID127+ID128+ID129+ID130+ID131+ID132+ID133+ID134+ID135+ID136+ID137+ID138) AS Permissions'+
                 " FROM technical group by Title having DeveloperName = '"+devloper +"'",(err,results)=>{*/
            connection.query('SELECT DeveloperName,Title, avg(count) AS Permissions'+
                " FROM permissionview where DeveloperName = '"+devloper +"' group by Title",(err,results)=>{

                connection.end();
                if(err){
                    reject(err)
                }else {
                    console.log(results);
                    resolve(results)
                }
            })
        })
    },

    getSystemActionsCountByDeveloper : (developer)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            /*  connection.query('SELECT Title,DeveloperName, sum(ID139+ID140+ID141+ID142+ID143+ID144+ID145+ID146+ID147+ID148+ID149+ID150+ID151+ID152+ID153+ID154+ID155+ID156+' +
                  'ID157+ID158+ID159+ID160+ID161+ID162+ID163+ID164+ID165+ID166+ID167+ID168+ID169+ID170+ID171+ID172+ID173+ID174+ID175+ID176+ID177+ID178+ID179+ID180+I' +
                  'D181+ID182+ID183+ID184+ID185+ID186+ID18+ID188+ID189+ID190+ID191+ID192+ID193+ID194+ID195+ID19+ID197+ID198+ID199+ID200+ID201+ID202+ID203+ID204+ID205+' +
                  'ID206+ID207+ID208+ID209+ID210+ID211+ID212+ID213+ID214+ID215+ID216+ID21+ID218+ID219+ID220+ID221+ID222+ID223+ID224+ID225+ID226+ID227+ID228+ID229+ID230' +
                  '+ID231+ID232+ID233+ID235+ID238+ID239+ID240+ID241+ID242+ID243+ID24+ID245+ID246+ID247+ID248+ID249+ID250+ID251+ID252+ID253+ID254+ID255+ID256+ID257+ID258' +
                  '+ID259+ID260+ID261+ID262+ID263+ID264+ID265+ID266+ID267+ID268+ID269+ID270+ID271+ID272+ID273+ID274+ID275+ID276+ID277+ID278+ID279+ID280+ID281+ID282+ID283' +
                  '+ID284+ID285+ID286+ID287+ID288+ID289+ID290+ID291+ID292+ID293+ID294+ID295+ID296+ID297+ID298+ID299+ID300+ID301+ID302+ID303+ID304+ID305+ID306+ID30+ID308' +
                  '+ID309+ID310+ID311+ID312) AS actionTotal'+
                  " FROM technical group by Title having DeveloperName = '"+developer +"'",(err,results)=>{*/
            connection.query('SELECT Title,DeveloperName, sum(count) AS actionTotal'+
                " FROM systemactionview where DeveloperName = '"+developer +"' group by Title",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    getSystemActionsCountByDevelopers : (developers, vtdetections)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            /* connection.query('SELECT title, DeveloperName, avg(ID139+ID140+ID141+ID142+ID143+ID144+ID145+ID146+ID147+ID148+ID149+ID150+ID151+ID152+ID153+ID154+ID155+ID156+' +
                 'ID157+ID158+ID159+ID160+ID161+ID162+ID163+ID164+ID165+ID166+ID167+ID168+ID169+ID170+ID171+ID172+ID173+ID174+ID175+ID176+ID177+ID178+ID179+ID180+I' +
                 'D181+ID182+ID183+ID184+ID185+ID186+ID18+ID188+ID189+ID190+ID191+ID192+ID193+ID194+ID195+ID19+ID197+ID198+ID199+ID200+ID201+ID202+ID203+ID204+ID205+' +
                 'ID206+ID207+ID208+ID209+ID210+ID211+ID212+ID213+ID214+ID215+ID216+ID21+ID218+ID219+ID220+ID221+ID222+ID223+ID224+ID225+ID226+ID227+ID228+ID229+ID230' +
                 '+ID231+ID232+ID233+ID235+ID238+ID239+ID240+ID241+ID242+ID243+ID24+ID245+ID246+ID247+ID248+ID249+ID250+ID251+ID252+ID253+ID254+ID255+ID256+ID257+ID258' +
                 '+ID259+ID260+ID261+ID262+ID263+ID264+ID265+ID266+ID267+ID268+ID269+ID270+ID271+ID272+ID273+ID274+ID275+ID276+ID277+ID278+ID279+ID280+ID281+ID282+ID283' +
                 '+ID284+ID285+ID286+ID287+ID288+ID289+ID290+ID291+ID292+ID293+ID294+ID295+ID296+ID297+ID298+ID299+ID300+ID301+ID302+ID303+ID304+ID305+ID306+ID30+ID308' +
                 '+ID309+ID310+ID311+ID312) AS actionTotal'+
                 ' FROM technical group by title having DeveloperName IN ('+developers +") order by DeveloperName ASC",(err,results)=>{*/
            connection.query('SELECT title, DeveloperName, avg(count) AS actionTotal'+
                ' FROM systemactionview where DeveloperName IN ('+developers +") "+sqlFilter+"group by DeveloperName order by DeveloperName ASC",(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    //get total count of permission in each group for a Developer across all apps
    getDevConsoleActions : (devloper)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query(`SELECT Title,SUM(ID1+ID10+ID100+ID101+ID102+ID103+ID104+ID105+ID106+ID107+ID108+ID109+ID11+ID110+ID111+ID112+ID113+ID114+ID115+ID116+ID117+ID118+ID119+ID12+ID120+ID121+ID122+ID123+ID124+ID125+ID126+ID127+ID128+ID129+ID13+ID130+ID131+ID132+ID133+ID134+ID135+ID136+ID137+ID138+ID14+ID15+ID16+ID17+ID18+ID19+ID2+ID20+ID21+ID22+ID23+ID24+ID25+ID26+ID27+ID28+ID29+ID3+ID30+ID31+ID313+ID314+ID315+ID316+ID317+ID318+ID319+ID32+ID320+ID321+ID33+ID34+ID35+ID36+ID37+ID38+ID39+ID4+ID40+ID41+ID42+ID43+ID44+ID45+ID46+ID47+ID48+ID49+ID5+ID50+ID51+ID52+ID53+ID54+ID55+ID56+ID57+ID58+ID59+ID6+ID60+ID61+ID62+ID63+ID64+ID65+ID66+ID67+ID68+ID69+ID7+ID70+ID71+ID72+ID73+ID74+ID75+ID76+ID77+ID78+ID79+ID8+ID80+ID81+ID82+ID83+ID84+ID85+ID86+ID87+ID88+ID89+ID9+ID90+ID91+ID92+ID93+ID94+ID95+ID96+ID97+ID98+ID99) AS 'total' FROM technical WHERE DeveloperName='${devloper}' GROUP BY Title`,(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },

    /*********** HeatMaps **************/

    getPermissionsByCalenderAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            filter.replace('\'', ' ');
            let connection = ConnectionController.createConnection();
            connection.query("select sum(ID313) as count from technical where "+filterName+ "= "+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByContactsAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query("select sum(ID315) as count from technical where "+filterName+ "= "+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByCameraAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID314) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByLocationAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID316) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByMicrophoneAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {

            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID317) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByPhoneAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID318) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsBySensorAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID319) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsBySmsAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID320) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsByStorageAndFilter : (filter, filterName)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select sum(ID321) as count from technical where '+filterName+ '= '+ filter, (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },


    /*********** VT Detection *************/


    getDistinctVTDetection : ()=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('SELECT distinct vtdetection FROM technical where vtdetection<> 0' , (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },


    getPermissionsByType : (type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select pid from permission where level = "' + type + '"' , (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsTotal : (cols, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
           /* let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }*/

            let sqlFilter  = UtilityController.getSQLV2(type, vtdetections);
            connection.query('select sum('+ cols+')  as total from technical ' + sqlFilter , (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getPermissionsTotalByGenre : (cols, genres, vtdetections, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
        /*    let sqlFilter  = ' and vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }
*/
            let sqlFilter  = UtilityController.getSQLV1(type, vtdetections);
            console.log('select sum('+ cols+')  as total from technical where Genre IN ('+ genres +') ' + sqlFilter);

            connection.query('select sum('+ cols+')  as total from technical where Genre IN ('+ genres +') ' + sqlFilter , (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    getResources : ()=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select * from resource', (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    registerUser : (name, email, action)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sql = "INSERT INTO users (name, email, action) VALUES ( '" +name +"', '"+ email+"','"+action+"')";
            connection.query(sql , (err, results) => {
                connection.end();
                if (err) {
                    resolve("User registration failed")
                } else {
                    resolve("Used registered successfully")
                }
            })
        });
    },

    getUsers : ()=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select * from users', (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },


    setApproval : (itemsList, approval)=>{
        return new Promise(function(resolve, reject) {
            for(let i = 0; i < itemsList.length; i++){
                const connection = ConnectionController.createConnection();
                let value = itemsList[i]
                console.log(value);
                let splits = value.split('_');
                let sql = "update users set approve = "+approval+" where name = '"+ splits[0] +"' and action = '" +splits[1] + "'";
                console.log(sql)
                connection.query(sql, (err, results) => {
                    connection.end();
                    if (err) {
                        resolve("Failed to update");
                    } else {

                        if(i == itemsList.length - 1){
                            resolve("Updated Successfully");
                        }
                    }

                });
            }

        });
    },


    getResourceNames : ()=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            connection.query('select name from resource where isdownloadable = 1', (err, results) => {
                connection.end();
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        });
    },

    insertResource : (resource)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sql = "INSERT INTO resource (name, source, isdownloadable, lastmodified) VALUES ('"+ resource.name+"','"+ resource.source+"', '"+ resource.isdownloadable+"', curdate() )";
            console.log(sql);
            connection.query(sql , (err, results) => {
                connection.end();
                if (err) {
                    console.log(err)
                    resolve("Rejected")
                } else {
                    resolve("Success")
                }
            })
        })},


    insertApp : (columns, values)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let sql = "INSERT INTO technical ("+columns+") VALUES ("+values +")";
            console.log(sql);
            connection.query(sql , (err, results) => {
                connection.end();
                if (err) {
                    console.log(err)
                    resolve("Rejected")
                } else {
                    resolve("Success")
                }
            })
        },)},

    insertPermActions : (columns, values, type)=>{
        return new Promise(function(resolve, reject) {
            let connection = ConnectionController.createConnection();
            let table = "permissionview";
            if(type == "action"){
                table = "systemactionview";
            }

            let sql = "INSERT INTO "+table+" ("+columns+") VALUES ("+values +")";
            console.log(sql);
            connection.query('SET FOREIGN_KEY_CHECKS=0')
            connection.query(sql , (err, results) => {
                connection.query('SET FOREIGN_KEY_CHECKS=1')
                connection.end();
                if (err) {
                    console.log(err)
                    resolve("Rejected")
                } else {
                    resolve("Success")
                }
            })
        },)},



}