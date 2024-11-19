import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';
import jwt from 'jsonwebtoken';

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  function sendFileCallBack(err) {
    if (err) {
      console.error("Error occurred while sending file:", err);
    }
    deleteLocalFiles([result]);
  }


  app.get( "/filteredimage", async (req, res) => {

    if (!req.query.image_url) {
      return res.status(400).send("Error Image URL Parameter");
    }
    if (!req.query.token) {
      return res.status(400).send("Error Token Parameter");
    }
    
    try {
      const user = await verifyToken(req.query.token, 'IUSETHISKEY');
      
      const result = await filterImageFromURL(req.query.image_url);
      
      res.sendFile(result, (err) => cleanUpFile(err, result));
      
    } catch (err) {
      res.status(403).send({ error: 'Unauthorized or failed to process the request.' });
    }


  } );

  app.get( "/getToken", async (req, res) => {
    if (!req.query.key) {
      return res.status(400).send("Error Key Parameter");
    }
    const user = { key: req.query.key };
    const token = jwt.sign(user, 'IUSETHISKEY', { expiresIn: '1h' });
    res.json({ token });

  } );
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /getToken?key={{}} to get a token, and then GET /filteredimage?image_url={{}}&key={{}}&token={{}} to filtered the image")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );

