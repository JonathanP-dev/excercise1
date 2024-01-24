const express = require( "express" );

const router = express.Router();

// GET /notes
router.get( "/notes", ( req, res ) => {
  res.status( 200 ).json( { msg: "GET REQUEST TO /api/notes" } );
} );

// POST /notes
router.post( "/notes", ( req, res ) => {
  res.status( 201 ).json( { msg: "POST REQUEST TO /api/notes" } );
} )

// PUT /notes/:id
router.put( "/notes/:id", ( req, res ) => {
  res.status( 200 ).json( { msg: "PUT REQUEST TO /api/notes/:id" } );
} )

// DELETE /notes/:id
router.delete( "/notes/:id", ( req, res ) => {
  res.status( 200 ).json( { msg: "DELETE REQUEST TO /api/notes/:id" } );
} )

module.exports = router;