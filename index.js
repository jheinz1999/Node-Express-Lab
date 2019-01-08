// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here

const server = express();

server.use(express.json());

server.post('/api/posts', (req, res) => {

  const post = req.body;

  if (!post.title || !post.contents) {

    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });

  }

  else {

    db.insert(post)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));

  }

});

server.delete('/api/posts/:id', async (req, res) => {

  try {

    const post = await db.findById(req.params.id);

    if (post.length) {

      await db.remove(req.params.id);

      res.status(200).json(post).end();

    }

    else {

      res.status(404).json({ message: "The post with the specified ID does not exist." });

    }

  }

  catch(err) {

    res.status(500).json({ error: "The post could not be removed" });

  }

});

server.put('/api/posts/:id', async (req, res) => {

  const edit = req.body;

  if (!edit.title || !edit.contents)
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });

  try {

    const post = await db.findById(req.params.id);

    if (post.length) {

      await db.update(req.params.id, edit);

      res.status(200).json(edit);

    }

    else {

      res.status(404).json({ message: "The post with the specified ID does not exist." });

    }

  }

  catch (err) {



  }

});

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
