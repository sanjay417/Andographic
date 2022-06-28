var SummaryController = require('../controllers/SummaryController');


module.exports = function (app) {
  app.get("/api/applicationsByGenre", function (req, res) {
      SummaryController.getApplicationsByGenre().then((data)=>{
          res.send(data)
      }).catch((err)=>{
          res.status(500).end();
          console.log(err)
      })
  });

    app.get("/api/maliciousApplicationsByGenre", function (req, res) {
        let {vtdetections} = req.query;
        SummaryController.getMaliciousApplicationsByGenre(vtdetections).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/benignApplicationsByGenre", function (req, res) {
        SummaryController.getBenignApplicationsByGenre().then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/v2/permissionUsage", function (req, res) {
        let {pids, genre} =req.query;

        SummaryController.getPermissionUsage(pids.split(','), genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/permissionUsage", function (req, res) {
        let {pids, genre, index, vtdetections} =req.query;

        SummaryController.getPermissionUsagev2(pids.split(','), genre, index, vtdetections).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/permissionUsageForBenignApps", function (req, res) {
        let {pids, genre} =req.query;

        SummaryController.getPermissionUsageForBenignApps(pids.split(','), genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/permissionUsageForMaliciousApps", function (req, res) {
        let {pids, vtdetections, genre} =req.query;
        SummaryController.getPermissionUsageForMaliciousApps(pids.split(','), vtdetections, genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/distinctGenreByPermission", function (req, res) {
        let {pid} =req.query;
        SummaryController.getDistinctGenreByPermission(pid).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/devAppCountAll", function (req, res) {
        console.log("INSIDE DEVELOPER COUNT")
        let {pids, genre, index, vtdetections} =req.query;
        SummaryController.getDeveloperAndAppCountAll(genre, index, vtdetections).then((data)=>{
            console.log("DATA -> ", data)
            // console.log("DATA LENGTH -> ", data.length)
            // i = 0;
            // dl = data.length;

            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ data}));

            // while (i <= dl-1){
            //     arr= []
            //     for (j=0; j<= 9; j++){   
            //         // console.log(data[i])
            //         arr.push(data[i]);
            //         i++
            //     }

            //     console.log("array",arr,i,dl)
            //     res.send(JSON.stringify({ arr}));
            // }
            // res.end();

           
            
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/devAppCountBenign", function (req, res) {
        let {pids, genre} =req.query;

        SummaryController.getDeveloperAndAppCountBenign(genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });


    app.get("/api/devAppCountMalicious", function (req, res) {
        let {vtdetections, genre} =req.query;
        SummaryController.getDeveloperAndAppCountMalicious(vtdetections, genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/populateBenignMaliciousCount", function (req, res) {
        SummaryController.getBenignMaliciousCount().then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/populateBenignMaliciousCountByGenre", function (req, res) {
        let {genre} =req.query;
        SummaryController.getBenignMaliciousCountByGenre(genre).then((data)=>{

            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
        
                    
    });

    app.get("/api/download", function (req, res) {
        let {limit, vtdetections, source, genre} =req.query;
        SummaryController.download(limit, vtdetections, source, genre).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/total", function (req, res) {
        SummaryController.getTotal().then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getPermCorrelation", function (req, res) {
        let {genre, type} =req.query;

        SummaryController.getPermCorrelation(genre, type).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

}
