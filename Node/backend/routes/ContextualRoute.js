var ContextualController = require('../controllers/ContextualController');


module.exports = function (app) {
  app.get("/api/getContextualColumns", function (req, res) {
      ContextualController.getColumnsNames().then((data)=>{
          res.send(data)
      }).catch((err)=>{
          res.status(500).end();
          console.log(err)
      })
  });

  app.get("/api/getContextualColumnData", function (req, res) {
        const {column} = req.query;

        console.log("In getContextualColumnData" +column);
        ContextualController.getColumnData(column).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
  });

  app.get("/api/getDeveloperAndAppCount", function (req, res) {
        const {vtdetections, count} = req.query;
        ContextualController.getDeveloperAndAppCount(vtdetections, count).then((data)=>{
            console.log(data)
            res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

  app.get("/api/getDeveloperData", function(req,res){
      ContextualController.getDeveloperData(40).then((data)=>{
          res.send(data)
      }).catch((err)=>{
          res.status(500).end();
          console.log(err)
      })
  });

  app.get("/api/getDevConsoleContentRating", function(req,res){
      const {developer} = req.query;
      ContextualController.getDevConsoleContentRating(developer).then((data)=>{
          res.send(data)
        }).catch((err)=>{
            res.status(500).end();
            console.log(err)
        })
    });

    app.get("/api/getDevConsoleGenre", function(req,res){
        const {developer} = req.query;
        ContextualController.getDevConsoleGenre(developer).then((data)=>{
            res.send(data)
          }).catch((err)=>{
              res.status(500).end();
              console.log(err)
          })
    });

    app.get("/api/getDeveloperApps", function(req, res){
        const {developer} = req.query;
        ContextualController.getDeveloperApps(developer).then((data) =>{
            res.send(data)
        }).catch((err) =>{
            res.status(500).end();
            console.log(err)
        })
    }); 

}
