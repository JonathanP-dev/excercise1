const express = require( 'express' );

const app = express();

const router = require( "./routes" );
app.use( "/api", router );

const PORT = 5000;

app.listen( PORT, () => {
  console.log( `Server is running on port ${PORT}` )
} );