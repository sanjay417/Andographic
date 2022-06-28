var TechnicalController = require('../controllers/TechnicalController');
const wkhtmltopdf = require('wkhtmltopdf');
module.exports = function (app) {
    app.get("/api/getPermissionCountByDeveloper", function (req, res) {
        const {developers, vtdetections} = req.query;
        TechnicalController.getPermissionCountByDeveloper(developers, vtdetections).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionCountByDevApp", function (req, res) {
        const {developers, vtdetections} = req.query;
        TechnicalController.getPermissionCountByDevApp(developers, vtdetections).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDangerousPermissionCountByDev", function (req, res) {
        const {developers, vtdetections} = req.query;
        TechnicalController.getDangerousPermissionCountByDev(developers, vtdetections).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByCategoryContacts", function (req, res) {
        const {developers} = req.query;
        TechnicalController.getPermissionsByCategoryContacts(developers).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getGenre", function (req, res) {
        TechnicalController.getGenre().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getGenreCount", function (req, res) {
        const {genres} = req.query;
        const {vtdetections, count} = req.query;
        TechnicalController.getGenreCount(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getApplications", function (req, res) {
        TechnicalController.getApplications().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getApplicationsWithFilter", function (req, res) {
        const {filter} = req.query;
        TechnicalController.getApplicationsWithFilter(filter).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionCountByApplication", function (req, res) {
        const {applications} = req.query;
        TechnicalController.getPermissionCountByApplication(applications).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getSystemActionsCountByApplications", function (req, res) {
        const {applications} = req.query;
        TechnicalController.getSystemActionsCountByApplications(applications).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissions", function (req, res) {
        TechnicalController.getPermissions().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionUsageCount", function (req, res) {
        const {permissionIds, vtdetections, count} = req.query;
        let permissionArr = permissionIds.split(',');
        console.log(permissionArr.length);
        TechnicalController.getPermissionUsageCount(permissionArr, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    /*app.get("/api/getPermissionsByGroup", function (req, res) {
        let finalResult = [];
        TechnicalController.getPermissionsByCalender(finalResult).then((data) =>{
            finalResult.push(data);
            TechnicalController.getPermissionsByContacts(finalResult).then((data) =>{
                finalResult.push(data);
                TechnicalController.getPermissionsByCamera(finalResult).then((data) =>{
                    finalResult.push(data);
                    TechnicalController.getPermissionsByLocation(finalResult).then((data) =>{
                        finalResult.push(data);
                        TechnicalController.getPermissionsByMicrophone(finalResult).then((data) =>{
                            finalResult.push(data);
                            TechnicalController.getPermissionsByPhone(finalResult).then((data) =>{
                                finalResult.push(data);
                                TechnicalController.getPermissionsBySensor(finalResult).then((data) =>{
                                    finalResult.push(data);
                                    TechnicalController.getPermissionsBySms(finalResult).then((data) =>{
                                        finalResult.push(data);
                                        TechnicalController.getPermissionsByStorage(finalResult).then((data) =>{
                                            finalResult.push(data);
                                            res.send(finalResult)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });*/

    app.get("/api/getPermissionsByGroup/Calendar", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByCalender(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Camera", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByCamera(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Contacts", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByContacts(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Location", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByLocation(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Microphone", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByMicrophone(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Phone", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByPhone(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Sensor", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsBySensor(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/SMS", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsBySms(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGroup/Storage", function (req, res) {
        const {vtdetections, count} = req.query;
        TechnicalController.getPermissionsByStorage(vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/getSystemActions", function (req, res) {
        TechnicalController.getSystemActions().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

   /* app.post('/pdf', (req, res) => {
        res.set('Content-Disposition','attachment;filename=pdffile.pdf')
        res.set('Content-Type', 'application/pdf');
        wkhtmltopdf.command='/Users/tejalghadge/wkhtmltopdf/bin/wkhtmltopdf';
       console.log( req.body);

        wkhtmltopdf(req.body.svg, {}, (err, stream) => {
            stream.pipe(res);
        });
    })*/

    
    /********PermissionAll Category By Genre********/

    app.get("/api/getPermissionsByGenre/Calendar", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreCalendar(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Camera", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreCamera(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Contacts", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreContacts(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Location", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreLocation(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Microphone", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreMicrophone(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Phone", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenrePhone(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Sensor", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreSensor(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/SMS", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreSms(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsByGenre/Storage", function (req, res) {
        const {genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsByGenreStorage(genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    /***Get Permissions by Developers**/
    app.get("/api/getPermissionUsageByDeveloper", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getPermissionUsageByDeveloper(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getSystemActionsCountByDeveloper", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getSystemActionsCountByDeveloper(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getSystemActionsCountByDevelopers", function (req, res) {
        const {developers, vtdetections} = req.query;
        TechnicalController.getSystemActionsCountByDevelopers(developers, vtdetections).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });
    
    app.get("/api/getGenrePermissionUsageCount", function (req, res) {
        const {permissionIds, genres} = req.query;
        let permissionArr = permissionIds.split(',');
        console.log(permissionArr.length);
        TechnicalController.getGenrePermissionUsageCount(permissionArr, genres).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/v2/getGenrePermissionUsageCount", function (req, res) {
        const {permissionIds, genres, vtdetections, count} = req.query;
        let permissions = permissionIds.split(',');
        let genresArr = genres.split(',');
        TechnicalController.getGenrePermissionUsageCountV2(permissions, genresArr, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDevConsolePermissions", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getDevConsolePermissions(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDevConsoleRatings", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getDevConsoleRatings(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDevConsoleAndroidVersion", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getDevConsoleAndroidVersion(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDevConsoleActions", function (req, res) {
        const {developer} = req.query;
        TechnicalController.getDevConsoleActions(developer).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    /********** Heatmaps routes *****************/
    app.get("/api/getPermissionsByGroupForFilter", function (req, res) {
        let finalResult = [];
        const {developer, filterName} = req.query;
        console.log("*********",developer, filterName);
        TechnicalController.getPermissionsByCalenderAndFilter(developer, filterName).then((data) =>{
            finalResult.push(data);
            TechnicalController.getPermissionsByContactsAndFilter(developer, filterName).then((data) =>{
                finalResult.push(data);
                TechnicalController.getPermissionsByCameraAndFilter(developer, filterName).then((data) =>{
                    finalResult.push(data);
                    TechnicalController.getPermissionsByLocationAndFilter(developer, filterName).then((data) =>{
                        finalResult.push(data);
                        TechnicalController.getPermissionsByMicrophoneAndFilter(developer, filterName).then((data) =>{
                            finalResult.push(data);
                            TechnicalController.getPermissionsByPhoneAndFilter(developer, filterName).then((data) =>{
                                finalResult.push(data);
                                TechnicalController.getPermissionsBySensorAndFilter(developer, filterName).then((data) =>{
                                    finalResult.push(data);
                                    TechnicalController.getPermissionsBySmsAndFilter(developer, filterName).then((data) =>{
                                        finalResult.push(data);
                                        TechnicalController.getPermissionsByStorageAndFilter(developer, filterName).then((data) =>{
                                            finalResult.push(data);
                                            res.send(finalResult)
                                            console.log(finalResult);
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    }),

    app.get("/api/VTDetection", function (req, res) {
        TechnicalController.getDistinctVTDetection().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/permissionByType", function (req, res) {
        const {type} = req.query;
        TechnicalController.getPermissionsByType(type).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/permissionsTotal", function (req, res) {
        const {cols, vtdetections, count} = req.query;
        TechnicalController.getPermissionsTotal(cols, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermissionsTotalByGenre", function (req, res) {
        const {cols, genres, vtdetections, count} = req.query;
        TechnicalController.getPermissionsTotalByGenre(cols, genres, vtdetections, count).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });



    app.get("/api/getResources", function (req, res) {
        TechnicalController.getResources().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    app.post("/api/registerUser", function (req, res) {
        console.log(res);
        console.log();
        let name = req.body.user.name;
        let email = req.body.user.email;
        let action = req.body.user.action;
        TechnicalController.registerUser(name, email, action).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/users", function (req, res) {
        TechnicalController.getUsers().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/approve", function (req, res) {
        const {items} = req.query;
        let itemsList = items.split(",");

        TechnicalController.setApproval(itemsList, 1).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/disapprove", function (req, res) {
        const {items} = req.query;
        let itemsList = items.split(",");

        TechnicalController.setApproval(itemsList, 0).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/resources", function (req, res) {
        TechnicalController.getResourceNames().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.post("/api/insert", function (req, res) {
        console.log(req.body.app);
        let app = req.body.app;
        let columns = []
        let values = []
        let i = 0;
        Object.keys(app).forEach(function(key) {
            let value =  app[key];
            columns[i] = key;
            values[i] = "'" + value + "'" ;
            i++;
        })
        TechnicalController.insertApp(columns.join(","), values.join(",")).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.post("/api/insertResource", function (req, res) {

        let resource = req.body.resource;
        TechnicalController.insertResource(resource).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });

    app.post("/api/insertPermActionView", function (req, res) {
        console.log(req.body.app);
        const {type} = req.query;
        let app = req.body.app;
        let columns = []
        let values = []
        let i = 0;
        Object.keys(app).forEach(function(key) {
            let value =  app[key];
            columns[i] = key;
            values[i] = "'" + value + "'" ;
            i++;
        })
        TechnicalController.insertPermActions(columns.join(","), values.join(","), type).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).end();
            console.log(err)
        })
    });



}