let PredictController = require('../controllers/PredictionController');


module.exports = function (app) {
  app.get("/api/predict", function (req, res) {
      PredictController.predict().then((data)=>{
          res.send(data)
      }).catch((err)=>{
          res.status(500).end();
          console.log(err)
      })
  });

}
