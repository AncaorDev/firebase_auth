
'use strict'
const port = process.env.PORT || 3000,
	  express       = require('express'),
	  bodyParser    = require('body-parser'),
	  cors          = require('cors'),
	  app           = express();
	  string_token  = 'testuid', 
	  database_url  = 'https://appfirebase-e99df.firebaseio.com';

var admin = require("firebase-admin");

// Ruta del json de configuración de firebase
var serviceAccount = require("./appfirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: database_url
});

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended : false}))
    .use(cors());

app.get('/token', (req, res)=> {
	admin.auth().createCustomToken(string_token).then((token) => {
		console.log('Custom token created:', token);
		res.status(200).send({token:token});
	}).catch((err) => {
		console.log('Error:', err);
	});
})

app.listen(port, () => {
	console.log('server iniciando en el puerto', port);
});

module.exports = app;