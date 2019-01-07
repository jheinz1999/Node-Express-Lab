// import your node modules 

const db = require('./data/db.js');
const server = require('express')();

// add your server code starting here

server.get('/api/posts', (req, res) => {

  db.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));

});

server.get('/api/posts/:id', (req, res) => {

  db.findById(req.params.id)
    .then(data => data.length > 0 ? res.status(200).json(data) : res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));

});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`A rad server is running on port ${port}`));
