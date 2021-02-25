const ConnectionController = require('./ConnectionController');
const UtilityController = require('./UtilityController');
module.exports = {
    getApplicationsByGenre : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let sql = 'select genre, count(*) as total from technical group by Genre';
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

    getBenignApplicationsByGenre : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let sql = 'select genre, count(*) as total from technical where vtdetection = 0 group by Genre';
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

    getMaliciousApplicationsByGenre : (vtdetections)=>{
        return new Promise(function(resolve, reject) {
            let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            const connection = ConnectionController.createConnection();
            let sql = 'select genre, count(*) as total from technical '+sqlFilter+' group by Genre';
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


    getDistinctGenreByPermission : (pid)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let sql = 'select genre , sum(genre) as total from technical where '+pid+' = 1 group by genre';
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



    getPermissionUsage : (pids, genre)=>{
        return new Promise(function(resolve, reject) {
                 let i;
                 let finalResult = [];
                 const connection = ConnectionController.createConnection();
                let genreFilter = '';
                if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                    genreFilter = ' where genre = "' +genre+'" ';
                }


                for(i = 0; i < pids.length; i++){
                      let pid = pids[i]
                      connection.query('select sum( '+pid+' ) as total from technical' + genreFilter, (err, results) => {
                          if (err) {
                              reject(err)
                          } else {
                              finalResult.push({total : results[0].total, pid: pid});
                              console.log("******" + finalResult.length);
                              if(finalResult.length == pids.length){
                                  connection.end();
                                  resolve(finalResult);
                              }
                          }
                      });
                  }
          });

           /* let finalResult = [];
            const pool = ConnectionController.createConnectionPool();
            for (i = 0; i < pids.length; i++) {
                let pid = pids[i];
                let sql = 'select sum( ' + pid + ' ) as total from technical';
                pool.getConnection(function (err, connection) {
                    if (err || connection == undefined) {
                        console.log("[mysql error]", err);
                    }
                    connection.query(sql, function (err, results) {
                        //connection.release();
                        if (!err) {
                            connection.release();
                            finalResult.push({total: results[0].total, pid: pid});
                            console.log("******" + finalResult.length);
                            if (finalResult.length == pids.length) {
                                resolve(finalResult);
                            }
                        }
                    });
                    connection.on('error', function (err) {
                        reject(err)
                    });
                });
            }
        });*/

    },

    getPermissionUsageForBenignApps : (pids, genre)=>{

        return new Promise(function(resolve, reject) {
            var i;
            let finalResult = [];
            let genreFilter = '';
            if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                genreFilter = ' and genre = "' +genre+'" ';
            }

            const connection = ConnectionController.createConnection();
            for(i = 0; i < pids.length; i++){
                let pid = pids[i]
                connection.query('select sum( '+pid+' ) as total from technical where malicious = "No"' + genreFilter, (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        finalResult.push({total : results[0].total, pid: pid});
                        console.log("******" + finalResult.length);
                        if(finalResult.length == pids.length){
                            connection.end();
                            resolve(finalResult);
                        }
                    }
                });
            }
        });

    },

    getPermissionUsagev2 : (pids, genre, type, vtdetections)=> {
        return new Promise(function (resolve, reject) {

            let i;
            let finalResult = [];
            const connection = ConnectionController.createConnection();
            let genreFilter = '';
            let sqlFilter = UtilityController.getSQLV1(type, vtdetections)

            if (genre != undefined && genre != "undefined" && genre.length > 0) {
                genreFilter = ' where genre = "' + genre + '" ';
            }else{
                sqlFilter = UtilityController.getSQLV2(type, vtdetections)
            }

            let str = UtilityController.concat(pids);

            let sql = 'select ' + str + ' from technical' + genreFilter + sqlFilter ;
            let pid = pids[i]
            connection.query(sql, (err, results) => {
                connection.end();
                console.log(sql);
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    console.log(results);
                    resolve(results)
                }
            });

        });
    },

    getPermissionUsageForMaliciousApps : (pids, vtdetections, genre)=>{

        return new Promise(function(resolve, reject) {
            var i;
            let finalResult = [];
            let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            let genreFilter = '';
            if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                genreFilter = ' and genre = "' +genre+'" ';
            }

            const connection = ConnectionController.createConnection();
            for(i = 0; i < pids.length; i++){
                let pid = pids[i]
                connection.query('select sum( '+pid+' ) as total from technical'+ sqlFilter + genreFilter, (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        finalResult.push({total : results[0].total, pid: pid});
                        console.log("******" + finalResult.length);
                        if(finalResult.length == pids.length){
                            connection.end();
                            resolve(finalResult);
                        }
                    }
                });
            }
        });

    },

    getRandomRecords : (limit)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            //SELECT * FROM technical ORDER BY RAND() LIMIT 20000;
            /*let sql = 'select ID1,ID2,ID3,ID4,ID5,ID6,ID7,ID8,ID9,ID10,ID11,ID12,ID13,ID14,ID15,ID16,ID17,ID18,ID19,ID20,' +
                'ID21,ID22,ID23,ID24,ID25,ID26,ID27,ID28,ID29,ID30,ID31,ID32,ID33,ID34,ID35,ID36,ID37,ID38,ID39,ID40,ID41,' +
                'ID42,ID43,ID44,ID45,ID46,ID47,ID48,ID49,ID50,ID51,ID52,ID53,ID54,ID55,ID56,ID57,ID58,ID59,ID60,ID61,ID62,' +
                'ID63,ID64,ID65,ID66,ID67,ID68,ID69,ID70,ID71,ID72,ID73,ID74,ID75,ID76,ID77,ID78,ID79,ID80,ID81,ID82,ID83,' +
                'ID84,ID85,ID86,ID87,ID88,ID89,ID90,ID91,ID92,ID93,ID94,ID95,ID96,ID97,ID98,ID99,ID100,ID101,ID102,ID103,' +
                'ID104,ID105,ID106,ID107,ID108,ID109,ID110,ID111,ID112,ID113,ID114,ID115,ID116,ID117,ID118,ID119,ID120,ID121,' +
                'ID122,ID123,ID124,ID125,ID126,ID127,ID128,ID129,ID130,ID131,ID132,ID133,ID134,ID135,ID136,ID137,ID138,ID139,' +
                'ID140,ID141,ID142,ID143,ID144,ID145,ID146,ID147,ID148,ID149,ID150,ID151,ID152,ID153,ID154,ID155,ID156,ID157,' +
                'ID158,ID159,ID160,ID161,ID162,ID163,ID164,ID165,ID166,ID167,ID168,ID169,ID170,ID171,ID172,ID173,ID174,ID175,' +
                'ID176,ID177,ID178,ID179,ID180,ID181,ID182,ID183,ID184,ID185,ID186,ID187,ID188,ID189,ID190,ID191,ID192,ID193,' +
                'ID194,ID195,ID196,ID197,ID198,ID199,ID200,ID201,ID202,ID203,ID204,ID205,ID206,ID207,ID208,ID209,ID210,ID211,' +
                'ID212,ID213,ID214,ID215,ID216,ID217,ID218,ID219,ID220,ID221,ID222,ID223,ID224,ID225,ID226,ID227,ID228,ID229,' +
                'ID230,ID231,ID232,ID233,ID234,ID235,ID236,ID237,ID238,ID239,ID240,ID241,ID242,ID243,ID244,ID245,ID246,ID247,' +
                'ID248,ID249,ID250,ID251,ID252,ID253,ID254,ID255,ID256,ID257,ID258,ID259,ID260,ID261,ID262,ID263,ID264,ID265,' +
                'ID266,ID267,ID268,ID269,ID270,ID271,ID272,ID273,ID274,ID275,ID276,ID277,ID278,ID279,ID280,ID281,ID282,ID283,' +
                'ID284,ID285,ID286,ID287,ID288,ID289,ID290,ID291,ID292,ID293,ID294,ID295,ID296,ID297,ID298,ID299,ID300,ID301,' +
                'ID302,ID303,ID304,ID305,ID306,ID307,ID308,ID309,ID310,ID311,ID312,ID313,ID314,ID317,ID319,' +
                'ID321,Ratings,FourStarRatings,' +
                'ThreeStarRatings,Genre,FiveStarRatings,' +
                'DeveloperName,TwoStarRatings,' +
                'vtdetection,malicious from technical limit 2';*/

            connection.query("select * from technical  limit 1" ,(err,results)=>{
                //console.log(results);
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },


    getDeveloperAndAppCountAll : (genre, type, vtdetections)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let genreFilter = '';
            let sqlFilter = UtilityController.getSQLV1(type, vtdetections)

            if (genre != undefined && genre != "undefined" && genre.length > 0) {
                genreFilter = ' where genre = "' + genre + '" ';
            }else{
                sqlFilter = UtilityController.getSQLV2(type, vtdetections)
            }

            let sql = 'select count(*) as total, DeveloperName as name from technical'+genreFilter+sqlFilter + ' group by DeveloperName;'

            connection.query(sql,(err,results)=>{
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

    getDeveloperAndAppCountBenign : (genre)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let filter = '';
            if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                filter = ' and genre = "' +genre+'" ';
            }

            connection.query('select distinct count(*) as total,  DeveloperName as name  from technical where vtdetection = 0 '+filter+'group by DeveloperName;',(err,results)=>{
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

    getDeveloperAndAppCountMalicious : (vtdetections, genre)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let filter = '';
            if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                filter = ' and genre = "' +genre+'" ';
            }

            let sqlFilter  = ' where vtdetection IN ('+vtdetections +') ';
            connection.query('select count(*) as total,  DeveloperName as name  from technical  '+sqlFilter+ filter +' group by DeveloperName;',(err,results)=>{
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

    getBenignMaliciousCount : (genre)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('select count(*) as total, malicious from technical group by malicious;',(err,results)=>{
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

    getBenignMaliciousCountByGenre : (genre)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('select count(*) as total, malicious from technical where genre = '+genre+' group by malicious;',(err,results)=>{
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

    download : (limit, vtdetections, source, genre)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();

            let sqlFilter  =  ' where vtdetection IN ('+vtdetections +') ';
            if(vtdetections == 'undefined' || vtdetections == undefined || vtdetections.length == 0){
                sqlFilter = " ";
            }

            let genreFilter = '';
            if(genre != undefined &&  genre != "undefined" && genre.length > 0){
                genreFilter = ' and genre IN ("' +genre+'" )';
            }

            let limitFilter = ' limit ' + limit;
            if(limit == undefined || limit.length == 0){
                limitFilter = ''
            }

            let columns = 'pkgname, ID1 as "ACCESS_CHECKIN_PROPERTIES"  , ID2 as "ACCESS_COARSE_LOCATION"  , ID3 as "ACCESS_FINE_LOCATION"  , ID4 as "ACCESS_LOCATION_EXTRA_COMMANDS"  , ID5 as "ACCESS_NETWORK_STATE"  , ID6 as "ACCESS_NOTIFICATION_POLICY"  , ID7 as "ACCESS_WIFI_STATE"  , ID8 as "ACCOUNT_MANAGER"  , ID9 as "ADD_VOICEMAIL"  , ID10 as "BATTERY_STATS"  , ID11 as "BIND_ACCESSIBILITY_SERVICE"  , ID12 as "BIND_APPWIDGET"  , ID13 as "BIND_CARRIER_MESSAGING_SERVICE"  , ID14 as "BIND_CARRIER_SERVICES"  , ID15 as "BIND_CHOOSER_TARGET_SERVICE"  , ID16 as "BIND_CONDITION_PROVIDER_SERVICE"  , ID17 as "BIND_DEVICE_ADMIN"  , ID18 as "BIND_DREAM_SERVICE"  , ID19 as "BIND_INCALL_SERVICE"  , ID20 as "BIND_INPUT_METHOD"  , ID21 as "BIND_MIDI_DEVICE_SERVICE"  , ID22 as "BIND_NFC_SERVICE"  , ID23 as "BIND_NOTIFICATION_LISTENER_SERVICE"  , ID24 as "BIND_PRINT_SERVICE"  , ID25 as "BIND_QUICK_SETTINGS_TILE"  , ID26 as "BIND_REMOTEVIEWS"  , ID27 as "BIND_SCREENING_SERVICE"  , ID28 as "BIND_TELECOM_CONNECTION_SERVICE"  , ID29 as "BIND_TEXT_SERVICE"  , ID30 as "BIND_TV_INPUT"  , ID31 as "BIND_VOICE_INTERACTION"  , ID32 as "BIND_VPN_SERVICE"  , ID33 as "BIND_VR_LISTENER_SERVICE"  , ID34 as "BIND_WALLPAPER"  , ID35 as "BLUETOOTH"  , ID36 as "BLUETOOTH_ADMIN"  , ID37 as "BLUETOOTH_PRIVILEGED"  , ID38 as "BODY_SENSORS"  , ID39 as "BROADCAST_PACKAGE_REMOVED"  , ID40 as "BROADCAST_SMS"  , ID41 as "BROADCAST_STICKY"  , ID42 as "BROADCAST_WAP_PUSH"  , ID313 as "CALENDAR"  , ID43 as "CALL_PHONE"  , ID44 as "CALL_PRIVILEGED"  , ID45 as "CAMERA"  , ID314 as "CAMERA.1"  , ID46 as "CAPTURE_AUDIO_OUTPUT"  , ID47 as "CAPTURE_SECURE_VIDEO_OUTPUT"  , ID48 as "CAPTURE_VIDEO_OUTPUT"  , ID49 as "CHANGE_COMPONENT_ENABLED_STATE"  , ID50 as "CHANGE_CONFIGURATION"  , ID51 as "CHANGE_NETWORK_STATE"  , ID52 as "CHANGE_WIFI_MULTICAST_STATE"  , ID53 as "CHANGE_WIFI_STATE"  , ID54 as "CLEAR_APP_CACHE"  , ID315 as "CONTACTS"  , ID55 as "CONTROL_LOCATION_UPDATES"  , ID56 as "DELETE_CACHE_FILES"  , ID57 as "DELETE_PACKAGES"  , ID58 as "DIAGNOSTIC"  , ID59 as "DISABLE_KEYGUARD"  , ID60 as "DUMP"  , ID61 as "EXPAND_STATUS_BAR"  , ID62 as "FACTORY_TEST"  , ID63 as "GET_ACCOUNTS"  , ID64 as "GET_ACCOUNTS_PRIVILEGED"  , ID65 as "GET_PACKAGE_SIZE"  , ID66 as "GET_TASKS"  , ID67 as "GLOBAL_SEARCH"  , ID68 as "INSTALL_LOCATION_PROVIDER"  , ID69 as "INSTALL_PACKAGES"  , ID70 as "INSTALL_SHORTCUT"  , ID71 as "INTERNET"  , ID72 as "KILL_BACKGROUND_PROCESSES"  , ID316 as "LOCATION"  , ID73 as "LOCATION_HARDWARE"  , ID74 as "MANAGE_DOCUMENTS"  , ID75 as "MASTER_CLEAR"  , ID76 as "MEDIA_CONTENT_CONTROL"  , ID317 as "MICROPHONE"  , ID77 as "MODIFY_AUDIO_SETTINGS"  , ID78 as "MODIFY_PHONE_STATE"  , ID79 as "MOUNT_FORMAT_FILESYSTEMS"  , ID80 as "MOUNT_UNMOUNT_FILESYSTEMS"  , ID81 as "NFC"  , ID82 as "PACKAGE_USAGE_STATS"  , ID83 as "PERSISTENT_ACTIVITY"  , ID318 as "PHONE"  , ID84 as "PROCESS_OUTGOING_CALLS"  , ID85 as "READ_CALENDAR"  , ID86 as "READ_CALL_LOG"  , ID87 as "READ_CONTACTS"  , ID88 as "READ_EXTERNAL_STORAGE"  , ID89 as "READ_FRAME_BUFFER"  , ID90 as "READ_INPUT_STATE"  , ID91 as "READ_LOGS"  , ID92 as "READ_PHONE_STATE"  , ID93 as "READ_SMS"  , ID94 as "READ_SYNC_SETTINGS"  , ID95 as "READ_SYNC_STATS"  , ID96 as "READ_VOICEMAIL"  , ID97 as "REBOOT"  , ID98 as "RECEIVE_BOOT_COMPLETED"  , ID99 as "RECEIVE_MMS"  , ID100 as "RECEIVE_SMS"  , ID101 as "RECEIVE_WAP_PUSH"  , ID102 as "RECORD_AUDIO"  , ID103 as "REORDER_TASKS"  , ID104 as "REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"  , ID105 as "REQUEST_INSTALL_PACKAGES"  , ID106 as "RESTART_PACKAGES"  , ID107 as "SEND_RESPOND_VIA_MESSAGE"  , ID108 as "SEND_SMS"  , ID319 as "SENSORS"  , ID109 as "SET_ALARM"  , ID110 as "SET_ALWAYS_FINISH"  , ID111 as "SET_ANIMATION_SCALE"  , ID112 as "SET_DEBUG_APP"  , ID113 as "SET_PREFERRED_APPLICATIONS"  , ID114 as "SET_PROCESS_LIMIT"  , ID115 as "SET_TIME"  , ID116 as "SET_TIME_ZONE"  , ID117 as "SET_WALLPAPER"  , ID118 as "SET_WALLPAPER_HINTS"  , ID119 as "SIGNAL_PERSISTENT_PROCESSES"  , ID320 as "SMS"  , ID120 as "STATUS_BAR"  , ID321 as "STORAGE"  , ID121 as "SYSTEM_ALERT_WINDOW"  , ID122 as "TRANSMIT_IR"  , ID123 as "UNINSTALL_SHORTCUT"  , ID124 as "UPDATE_DEVICE_STATS"  , ID125 as "USE_FINGERPRINT"  , ID126 as "USE_SIP"  , ID127 as "VIBRATE"  , ID128 as "WAKE_LOCK"  , ID129 as "WRITE_APN_SETTINGS"  , ID130 as "WRITE_CALENDAR"  , ID131 as "WRITE_CALL_LOG"  , ID132 as "WRITE_CONTACTS"  , ID133 as "WRITE_EXTERNAL_STORAGE"  , ID134 as "WRITE_GSERVICES"  , ID135 as "WRITE_SECURE_SETTINGS"  , ID136 as "WRITE_SETTINGS"  , ID137 as "WRITE_SYNC_SETTINGS"  , ID138 as "WRITE_VOICEMAIL"  , ID223 as "android.app.action.ACTION_PASSWORD_CHANGED"  , ID244 as "android.app.action.ACTION_PASSWORD_EXPIRING"  , ID241 as "android.app.action.ACTION_PASSWORD_FAILED"  , ID232 as "android.app.action.ACTION_PASSWORD_SUCCEEDED"  , ID229 as "android.app.action.ACTION_PROFILE_PROVISIONING_COMPLETE"  , ID305 as "android.app.action.DEVICE_ADMIN_DISABLE_REQUESTED"  , ID307 as "android.app.action.DEVICE_ADMIN_DISABLED"  , ID162 as "android.app.action.DEVICE_ADMIN_ENABLED"  , ID283 as "android.bluetooth.a2dp.action.SINK_STATE_CHANGED"  , ID187 as "android.bluetooth.a2dp.intent.action.SINK_STATE_CHANGED"  , ID147 as "android.bluetooth.a2dp.profile.action.CONNECTION_STATE_CHANGED"  , ID299 as "android.bluetooth.a2dp.profile.action.PLAYING_STATE_CHANGED"  , ID199 as "android.bluetooth.adapter.action.CONNECTION_STATE_CHANGED"  , ID163 as "android.bluetooth.adapter.action.DISCOVERY_FINISHED"  , ID155 as "android.bluetooth.adapter.action.DISCOVERY_STARTED"  , ID185 as "android.bluetooth.adapter.action.LOCAL_NAME_CHANGED"  , ID264 as "android.bluetooth.adapter.action.SCAN_MODE_CHANGED"  , ID164 as "android.bluetooth.adapter.action.STATE_CHANGED"  , ID237 as "android.bluetooth.device.action.ACL_CONNECTED"  , ID152 as "android.bluetooth.device.action.ACL_DISCONNECT_REQUESTED"  , ID221 as "android.bluetooth.device.action.ACL_DISCONNECTED"  , ID167 as "android.bluetooth.device.action.BOND_STATE_CHANGED"  , ID238 as "android.bluetooth.device.action.CLASS_CHANGED"  , ID219 as "android.bluetooth.device.action.FOUND"  , ID286 as "android.bluetooth.device.action.NAME_CHANGED"  , ID248 as "android.bluetooth.device.action.PAIRING_REQUEST"  , ID173 as "android.bluetooth.device.action.UUID"  , ID188 as "android.bluetooth.devicepicker.action.DEVICE_SELECTED"  , ID262 as "android.bluetooth.devicepicker.action.LAUNCH"  , ID240 as "android.bluetooth.headset.action.AUDIO_STATE_CHANGED"  , ID298 as "android.bluetooth.headset.action.STATE_CHANGED"  , ID146 as "android.bluetooth.headset.action.VENDOR_SPECIFIC_HEADSET_EVENT"  , ID267 as "android.bluetooth.headset.profile.action.AUDIO_STATE_CHANGED"  , ID249 as "android.bluetooth.headset.profile.action.CONNECTION_STATE_CHANGED"  , ID243 as "android.bluetooth.input.profile.action.CONNECTION_STATE_CHANGED"  , ID297 as "android.bluetooth.inputdevice.action.INPUT_DEVICE_STATE_CHANGED"  , ID301 as "android.bluetooth.intent.action.BLUETOOTH_STATE_CHANGED"  , ID224 as "android.bluetooth.intent.action.BOND_STATE_CHANGED_ACTION"  , ID259 as "android.bluetooth.intent.action.BONDING_CREATED"  , ID202 as "android.bluetooth.intent.action.BONDING_REMOVED"  , ID235 as "android.bluetooth.intent.action.DISABLED"  , ID293 as "android.bluetooth.intent.action.DISCOVERY_COMPLETED"  , ID210 as "android.bluetooth.intent.action.DISCOVERY_STARTED"  , ID284 as "android.bluetooth.intent.action.ENABLED"  , ID290 as "android.bluetooth.intent.action.HEADSET_ADUIO_STATE_CHANGED"  , ID303 as "android.bluetooth.intent.action.HEADSET_STATE_CHANGED"  , ID194 as "android.bluetooth.intent.action.MODE_CHANGED"  , ID169 as "android.bluetooth.intent.action.NAME_CHANGED"  , ID203 as "android.bluetooth.intent.action.PAIRING_CANCEL"  , ID310 as "android.bluetooth.intent.action.PAIRING_REQUEST"  , ID260 as "android.bluetooth.intent.action.REMOTE_ALIAS_CHANGED"  , ID269 as "android.bluetooth.intent.action.REMOTE_ALIAS_CLEARED"  , ID157 as "android.bluetooth.intent.action.REMOTE_DEVICE_CONNECTED"  , ID289 as "android.bluetooth.intent.action.REMOTE_DEVICE_DISAPPEARED"  , ID247 as "android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECT_REQUESTED"  , ID195 as "android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECTED"  , ID206 as "android.bluetooth.intent.action.REMOTE_DEVICE_FOUND"  , ID233 as "android.bluetooth.intent.action.REMOTE_NAME_FAILED"  , ID236 as "android.bluetooth.intent.action.REMOTE_NAME_UPDATED"  , ID201 as "android.bluetooth.intent.action.SCAN_MODE_CHANGED"  , ID256 as "android.bluetooth.pan.action.STATE_CHANGED"  , ID175 as "android.bluetooth.pan.profile.action.CONNECTION_STATE_CHANGED"  , ID204 as "android.hardware.action.NEW_PICTURE"  , ID197 as "android.hardware.action.NEW_VIDEO"  , ID198 as "android.hardware.input.action.QUERY_KEYBOARD_LAYOUTS"  , ID179 as "android.intent.action.ACTION_POWER_CONNECTED"  , ID216 as "android.intent.action.ACTION_POWER_DISCONNECTED"  , ID158 as "android.intent.action.ACTION_SHUTDOWN"  , ID153 as "android.intent.action.AIRPLANE_MODE"  , ID192 as "android.intent.action.APPLICATION_RESTRICTIONS_CHANGED"  , ID258 as "android.intent.action.BATTERY_CHANGED"  , ID231 as "android.intent.action.BATTERY_LOW"  , ID215 as "android.intent.action.BATTERY_OKAY"  , ID176 as "android.intent.action.BOOT_COMPLETED"  , ID184 as "android.intent.action.CAMERA_BUTTON"  , ID156 as "android.intent.action.CONFIGURATION_CHANGED"  , ID295 as "android.intent.action.CONTENT_CHANGED"  , ID271 as "android.intent.action.DATA_SMS_RECEIVED"  , ID282 as "android.intent.action.DATE_CHANGED"  , ID213 as "android.intent.action.DEVICE_STORAGE_LOW"  , ID226 as "android.intent.action.DEVICE_STORAGE_OK"  , ID214 as "android.intent.action.DOCK_EVENT"  , ID273 as "android.intent.action.DOWNLOAD_COMPLETE"  , ID252 as "android.intent.action.DOWNLOAD_NOTIFICATION_CLICKED"  , ID234 as "android.intent.action.DREAMING_STARTED"  , ID220 as "android.intent.action.DREAMING_STOPPED"  , ID272 as "android.intent.action.EXTERNAL_APPLICATIONS_AVAILABLE"  , ID142 as "android.intent.action.EXTERNAL_APPLICATIONS_UNAVAILABLE"  , ID171 as "android.intent.action.FETCH_VOICEMAIL"  , ID246 as "android.intent.action.GTALK_CONNECTED"  , ID304 as "android.intent.action.GTALK_DISCONNECTED"  , ID250 as "android.intent.action.HEADSET_PLUG"  , ID308 as "android.intent.action.INPUT_METHOD_CHANGED"  , ID151 as "android.intent.action.LOCALE_CHANGED"  , ID239 as "android.intent.action.MANAGE_PACKAGE_STORAGE"  , ID140 as "android.intent.action.MEDIA_BAD_REMOVAL"  , ID145 as "android.intent.action.MEDIA_BUTTON"  , ID274 as "android.intent.action.MEDIA_CHECKING"  , ID191 as "android.intent.action.MEDIA_EJECT"  , ID277 as "android.intent.action.MEDIA_MOUNTED"  , ID217 as "android.intent.action.MEDIA_NOFS"  , ID141 as "android.intent.action.MEDIA_REMOVED"  , ID245 as "android.intent.action.MEDIA_SCANNER_FINISHED"  , ID178 as "android.intent.action.MEDIA_SCANNER_SCAN_FILE"  , ID149 as "android.intent.action.MEDIA_SCANNER_STARTED"  , ID263 as "android.intent.action.MEDIA_SHARED"  , ID275 as "android.intent.action.MEDIA_UNMOUNTABLE"  , ID266 as "android.intent.action.MEDIA_UNMOUNTED"  , ID280 as "android.intent.action.MY_PACKAGE_REPLACED"  , ID242 as "android.intent.action.NEW_OUTGOING_CALL"  , ID159 as "android.intent.action.NEW_VOICEMAIL"  , ID270 as "android.intent.action.PACKAGE_ADDED"  , ID225 as "android.intent.action.PACKAGE_CHANGED"  , ID254 as "android.intent.action.PACKAGE_DATA_CLEARED"  , ID268 as "android.intent.action.PACKAGE_FIRST_LAUNCH"  , ID165 as "android.intent.action.PACKAGE_FULLY_REMOVED"  , ID291 as "android.intent.action.PACKAGE_INSTALL"  , ID287 as "android.intent.action.PACKAGE_NEEDS_VERIFICATION"  , ID161 as "android.intent.action.PACKAGE_REMOVED"  , ID183 as "android.intent.action.PACKAGE_REPLACED"  , ID181 as "android.intent.action.PACKAGE_RESTARTED"  , ID190 as "android.intent.action.PACKAGE_VERIFIED"  , ID154 as "android.intent.action.PHONE_STATE"  , ID200 as "android.intent.action.PROVIDER_CHANGED"  , ID276 as "android.intent.action.PROXY_CHANGE"  , ID196 as "android.intent.action.REBOOT"  , ID150 as "android.intent.action.SCREEN_OFF"  , ID306 as "android.intent.action.SCREEN_ON"  , ID265 as "android.intent.action.TIME_SET"  , ID251 as "android.intent.action.TIME_TICK"  , ID227 as "android.intent.action.TIMEZONE_CHANGED"  , ID144 as "android.intent.action.UID_REMOVED"  , ID182 as "android.intent.action.UMS_CONNECTED"  , ID261 as "android.intent.action.UMS_DISCONNECTED"  , ID180 as "android.intent.action.USER_PRESENT"  , ID222 as "android.intent.action.WALLPAPER_CHANGED"  , ID311 as "android.media.ACTION_SCO_AUDIO_STATE_UPDATED"  , ID294 as "android.media.action.CLOSE_AUDIO_EFFECT_CONTROL_SESSION"  , ID218 as "android.media.action.OPEN_AUDIO_EFFECT_CONTROL_SESSION"  , ID189 as "android.media.AUDIO_BECOMING_NOISY"  , ID212 as "android.media.RINGER_MODE_CHANGED"  , ID255 as "android.media.SCO_AUDIO_STATE_CHANGED"  , ID208 as "android.media.VIBRATE_SETTING_CHANGED"  , ID174 as "android.net.conn.BACKGROUND_DATA_SETTING_CHANGED"  , ID257 as "android.net.conn.CONNECTIVITY_CHANGE"  , ID186 as "android.net.nsd.STATE_CHANGED"  , ID166 as "android.net.scoring.SCORE_NETWORKS"  , ID148 as "android.net.wifi.NETWORK_IDS_CHANGED"  , ID292 as "android.net.wifi.p2p.CONNECTION_STATE_CHANGE"  , ID143 as "android.net.wifi.p2p.DISCOVERY_STATE_CHANGE"  , ID309 as "android.net.wifi.p2p.PEERS_CHANGED"  , ID228 as "android.net.wifi.p2p.STATE_CHANGED"  , ID139 as "android.net.wifi.p2p.THIS_DEVICE_CHANGED"  , ID160 as "android.net.wifi.RSSI_CHANGED"  , ID207 as "android.net.wifi.SCAN_RESULTS"  , ID170 as "android.net.wifi.STATE_CHANGE"  , ID285 as "android.net.wifi.supplicant.CONNECTION_CHANGE"  , ID193 as "android.net.wifi.supplicant.STATE_CHANGE"  , ID253 as "android.net.wifi.WIFI_STATE_CHANGED"  , ID177 as "android.nfc.action.ADAPTER_STATE_CHANGED"  , ID312 as "android.os.action.POWER_SAVE_MODE_CHANGED"  , ID209 as "android.provider.Telephony.SIM_FULL"  , ID281 as "android.provider.Telephony.SMS_CB_RECEIVED"  , ID302 as "android.provider.Telephony.SMS_DELIVER"  , ID168 as "android.provider.Telephony.SMS_EMERGENCY_CB_RECEIVED"  , ID230 as "android.provider.Telephony.SMS_RECEIVED"  , ID288 as "android.provider.Telephony.SMS_REJECTED"  , ID300 as "android.provider.Telephony.SMS_SERVICE_CATEGORY_PROGRAM_DATA_RECEIVED"  , ID278 as "android.provider.Telephony.WAP_PUSH_DELIVER"  , ID279 as "android.provider.Telephony.WAP_PUSH_RECEIVED"  , ID296 as "android.speech.tts.engine.TTS_DATA_INSTALLED"  , ID172 as "android.speech.tts.TTS_QUEUE_PROCESSING_COMPLETED"  , ID205 as "com.google.gservices.intent.action.GSERVICES_CHANGED"  , ID211 as "com.google.gservices.intent.action.GSERVICES_OVERRIDE"  ,  Description, WhatsNew,Ratings,Title, FourStarRatings, DeveloperAddress, LastUpdated, ReviewsAverage, Price, ThreeStarRatings, PrivacyPolicyLink, Genre, FiveStarRatings, OneStarRatings, Url, ContentRating, CurrentVersion, DeveloperEmail, AndroidVersion, DeveloperWebsite, DeveloperName, FileSize, TwoStarRatings, Downloads'
            let sql = 'select '+columns+' from technical '+ sqlFilter +'where source = "'+source+'" '+genreFilter+limitFilter;
            connection.query(sql,(err,results)=>{
                console.log(sql)
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },


    getTotal : ()=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            connection.query('select count(*) as total from technical',(err,results)=>{
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },


    getPermCorrelation : (genre, type)=>{
        return new Promise(function(resolve, reject) {
            const connection = ConnectionController.createConnection();
            let table = 'permissionview'
            if(type == 'action'){
                table = 'systemactionview'
            }

            let sql = "select * from  "+table+" where genre = '"+ genre +"'";
            connection.query(sql , (err,results)=>{
                console.log(sql)
                connection.end();
                if(err){
                    reject(err)
                }else {
                    resolve(results)
                }
            })
        })
    },
}