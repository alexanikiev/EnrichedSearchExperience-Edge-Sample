var createError = require('http-errors');
var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');

var elasticsearchRouter = require('./routes/elasticsearch');
var gremlinserverRouter = require('./routes/gremlinserver');
var mongoRouter = require('./routes/mongo');
var sqlRouter = require('./routes/sql');
var stanfordcorenlpRouter = require('./routes/stanfordcorenlp');
var tikaRouter = require('./routes/tika');
var keyPhraseExtractionRouter = require('./routes/keyphraseextraction');
var languageDetectionRouter = require('./routes/languagedetection');
var fusekiRouter = require('./routes/fuseki');
var authRouter = require('./routes/auth');
var ocrRouter = require('./routes/ocr');
var sttRouter = require('./routes/stt');
var storageRouter = require('./routes/storage');
var customVisionRouter = require('./routes/customvision');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Enriched Search Experience Edge API",
      description: "Enriched Search Experience Edge API",
      contact: {
        name: "API Support",
        url: "http://www.swagger.io/support",
        email: "support@swagger.io"
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      version: "1.0.0"
    }
  },
  apis: ['./routes/customvision.js', 
         './routes/elasticsearch.js',
         './routes/fuseki.js', 
         './routes/gremlinserver.js',
         './routes/keyphraseextraction.js',
         './routes/languagedetection.js',
         './routes/mongo.js',
         './routes/ocr.js',
         './routes/sentimentanalysis.js',
         './routes/sql.js', 
         './routes/stanfordcorenlp.js',
         './routes/storage.js',
         './routes/stt.js',
         './routes/texttranslator.js',
         './routes/tika.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());//new:
app.use(fileUpload());//new:

app.use(logger('dev'));

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/elasticsearch', elasticsearchRouter);
app.use('/gremlinserver', gremlinserverRouter);
app.use('/mongo', mongoRouter);
app.use('/sql', sqlRouter);
app.use('/stanfordcorenlp', stanfordcorenlpRouter);
app.use('/tika', tikaRouter);
app.use('/keyphraseextraction', keyPhraseExtractionRouter);
app.use('/languagedetection', languageDetectionRouter);
app.use('/fuseki', fusekiRouter);
//app.use('/auth', authRouter);
app.use('/ocr', ocrRouter);
app.use('/stt', sttRouter);
app.use('/storage', storageRouter);
app.use('/customvision', customVisionRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
