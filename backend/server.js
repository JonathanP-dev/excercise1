require( "dotenv" ).config()
const express = require( 'express' );
const { connectToMongoDb } = require( "./database" )
const cors = require( 'cors' );

const app = express();
app.use( express.json() );
app.use( cors() );
const router = require( "./routes" );
app.use( "/api", router );

const PORT = process.env.PORT || 5000;

async function startServer () {
  await connectToMongoDb();
  app.listen( PORT, () => {
    console.log( `Server is running on port ${PORT}` )
  } );
}

startServer();