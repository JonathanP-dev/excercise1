const express = require( "express" );
const router = express.Router();
const { getConnectedClient } = require( "./database" );
const { ObjectId } = require( "mongodb" )


const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db( "notesDB" ).collection( "notes" )
  return collection;
}

// GET /notes
router.get( "/notes", async ( req, res ) => {
  const collection = getCollection();
  const notes = await collection.find( {} ).toArray();
  console.log( notes )

  res.status( 200 ).json( notes );
} );

// POST /notes
router.post( "/notes", async ( req, res ) => {
  const collection = getCollection();
  const note = req.body;

  const newNote = await collection.insertOne( note )
  console.log( newNote )
  res.status( 201 ).json( { note, status: false } );
} )

// PUT /notes/:id
router.put( "/notes/:id", async ( req, res ) => {
  const collection = getCollection();
  const _id = new ObjectId( req.params.id );
  const data = req.body;

  const oldNote = await collection.findOne( { _id: _id } );
  const newNote = await collection.findOneAndReplace( { _id: _id }, { ...data, tags: [...oldNote.tags, ...data.tags] } );
  console.log( newNote )

  res.status( 200 ).json( { msg: "PUT REQUEST TO /api/notes/:id" } );
} )

// DELETE /notes/:id
router.delete( "/notes/:id", async ( req, res ) => {
  const collection = getCollection();
  const _id = new ObjectId( req.params.id );

  const deletedNote = await collection.deleteOne( { _id } )
  res.status( 200 ).json( deletedNote );
} )

module.exports = router;