require( "dotenv" ).config();
const { MongoClient, ServerApiVersion } = require( "mongodb" );

const uri = process.env.MONGODB_URI || "mongodb://localhosto:27017/"

const options = {
  serverAPi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}

let client;
const connectToMongoDb = async () => {
  if ( !client ) {
    try {
      client = await MongoClient.connect( uri, options )
      console.log( "Connected to mongoDB" )
    } catch ( error ) {
      console.log( error )
    }
  }
  return client
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDb, getConnectedClient }