const contextualRoute = require('./ContextualRoute');
const technicalRoute = require('./TechnicalRoute');
const summaryRoute = require('./SummaryRoute');
const predictRoute = require('./PredictRoute');
const analyzerRoute = require('./AnalyzerRoute')

module.exports = function (app) {
  summaryRoute(app);
  contextualRoute(app);
  technicalRoute(app);
  predictRoute(app);
  analyzerRoute(app);
}
